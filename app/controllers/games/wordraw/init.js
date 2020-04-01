var Game = require.main.require('./app/models/game/game');
var logger = require.main.require('./app/loader/logger');
var createActiveGame = require.main.require('./app/controllers/users/createActiveGame');
var getAllPlayersInGame = require.main.require('./app/controllers/users/getAllActivePlayersInGame');

function initWordraw (req, res, baseDir) {
    logger.debug("Méthode controllers/games/wordraw/init/initWordraw");
    Game.loadGame("wordraw", (err, data) => {
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
                "game_wordraw", 
                {
                    layout: "game",
                    gameName: "Dessine-moi une pizza !",
                    errorMessage: errorMessage
                }
            );
            gameId = data.id;
            getAllPlayersInGame(gameId, (err, allPlayers) => {
                logger.route(`   /${gameId} emit newPlayer event.`);
                console.log(allPlayers);
                req.app.get("io").of(`/${gameId}`).emit("newPlayer", allPlayers);
            });
        });
    });
}

module.exports = initWordraw