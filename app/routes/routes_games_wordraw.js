var initWordraw = require.main.require('./app/controllers/games/wordraw/init')
var logger = require.main.require('./app/loader/logger');

module.exports = function(app, baseDir) {
    app.get('/games/wordraw', (req, res) => {
        logger.route("GET /games/wordraw");
        initWordraw(req, res, baseDir);
    })
}