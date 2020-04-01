var Game = require.main.require('./app/models/game/game');
var logger = require.main.require('./app/loader/logger');
var createActiveGame = require.main.require('./app/controllers/users/createActiveGame');
var getAllPlayersInGame = require.main.require('./app/controllers/users/getAllActivePlayersInGame');

function initBoggle (req, res, baseDir) {
    logger.debug("Méthode controllers/games/boggle/init/initBoggle");
    Game.loadGame("boggle", (err, data) => {
        if(err) {
            res.redirect("/games?error=" + err);
            return;
        }
        createActiveGame(data.id, req.decoded.username, (err, data_) => {
            errorMessage = "";
            if(err) {
                if (err.code == "11000") {
                    errorMessage = "Vous participez déjà à cette partie.";
                } else {
                    res.redirect("/games?error=" + err);
                    return;
                }
            }
            res.render(
                "game_boggle",
                {
                    layout: "game",
                    gameName: "Boggle",
                    errorMessage: errorMessage,
                    gameId: data.id
                }
            );
            gameId = data.id;
            getAllPlayersInGame(gameId, (err, allPlayers) => {
                logger.route(`   /${gameId} emit newPlayer event.`);
                req.app.get("io").of(`/${gameId}`).emit("newPlayer", allPlayers);
            });
        });
    });
}

module.exports = initBoggle