// Main dependencies
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const logger = require.main.require('./app/loader/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon');
const compression = require('compression')
const handlebars = require('express-handlebars');
const checkToken = require('./app/controllers/users/check');

// Init logs
logger.initLogs()

// Loading configuration
var config = require('./app/config/config');

// Setting up application
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + "/site"));
app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname));
app.use(favicon(__dirname + '/site/images/favicon.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(checkToken);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/site/views')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/site/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default'
}));

// Connect to DB
require('./app/loader/dbConnection');

// Loading main routes
require('./app/routes/routes_games_boggle')(app, __dirname);
require('./app/routes/routes_games_wordraw')(app, __dirname);
require('./app/routes/routes_games')(app, __dirname);
require('./app/routes/routes_users')(app, __dirname);
require('./app/routes/routes')(app, __dirname);

// Connect Socket IO
io.on('connection', (socket) => {});

// Setting io in global context for transverse use
app.set('io', io);

// Launch server
server.listen(
    config.server.port, 
    () => {
        logger.info('Server is running on port ' + server.address().port);
    }
);

process.on("SIGINT", function () {
    process.exit();
});

process.on('exit', () => {
    logger.info('Extinction du serveur.');
});