var logger = require.main.require('./app/loader/logger');

function getAllInGame(gameId, callback) {
    logger.debug("Méthode models/user/user__getAllInGame/getAllInGame");
    this.find(
        {
            activeGames: { 
                "$elemMatch": {
                    gameId: gameId
                }
            }
        },
        (err, data) => {
            if(err) {
                logger.error("models/activePlayer/activePlayer__getAllInGame : Erreur de lecture/écriture sur la base");
            }
            callback(err, data);
        }
    )
}

function getAllInGamePlugin(schema, options) {
    schema.statics.getAllInGame = getAllInGame;
}
  
module.exports = getAllInGamePlugin;