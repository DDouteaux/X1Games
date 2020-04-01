var initBoggle = require.main.require('./app/controllers/games/boggle/init')
var logger = require.main.require('./app/loader/logger');

module.exports = function(app, baseDir) {
    app.get('/games/boggle', (req, res) => {
        logger.route("GET /games/boggle");
        initBoggle(req, res, baseDir);
    })
}