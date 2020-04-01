var logger = require.main.require('./app/loader/logger');

function nbPlayersInGame(gameId, callback) {
    logger.debug("Méthode models/user/user__nbPlayersInGame/nbPlayersInGame");
    this.countDocuments(
        {
            activeGames: { 
                "$elemMatch": {
                    gameId: gameId
                }
            }
        },
        (err, data) => {
            if(err) {
                logger.error("models/user/user__nbPlayersInGame : Erreur de lecture/écriture sur la base");
            }
            callback(err, data);
        }
    )
}

function nbPlayersInGamePlugin(schema, options) {
    schema.statics.nbPlayersInGame = nbPlayersInGame;
}
  
module.exports = nbPlayersInGamePlugin;