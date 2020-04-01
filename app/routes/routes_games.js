var choseGame = require.main.require('./app/controllers/games/chose');
var logger = require.main.require('./app/loader/logger');

module.exports = function(app, baseDir) {
    app.get('/games', (req, res) => {
        logger.route("GET /games");
        res.render('game_chose');
        //res.sendFile('/site/pages/games/chose.html', { root: baseDir });
    })

    app.post('/games', (req, res) => {
        logger.route("POST /games");
        choseGame(req, res);
    })
}