var User = require.main.require('./app/models/user/user');
var activePlayerHandle = require.main.require('./src/scripts/games/activePlayers/handle');
var logger = require.main.require('./src/scripts/utils/logger');

function userLeave(req, res) {
    logger.debug("Méthode controllers/users/leave/userLeave");
    logger.debug("   > <== " + req.decoded.username + " is leaving.");
    playingOtherGames = activePlayerHandle.numberOfGameForPlayer(req.decoded.username);

    if (!playingOtherGames) {
        User.findOneAndUpdate(
            { 
                username: req.decoded.username
            }, 
            {
                isConnected: false
            }, 
            { 
                upsert: false,
                new: false
            }, 
            function(err) {
                if(err) {
                    logger.error("controllers/users/leave/userLeave : Erreur de lecture/écriture sur la base");
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    }

    activePlayerHandle.removePlayerFromGame(req.decoded.username);
}

module.exports = userLeave