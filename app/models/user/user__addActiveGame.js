var logger = require.main.require('./app/loader/logger');

function addActiveGame(userId, score, gameId, roundOrder, callback) {
    logger.debug("Méthode models/user/user__addActiveGame/addActiveGame");
    this.findOne(
        {
            username: userId,
            activeGames: { 
                "$elemMatch": {
                    gameId: gameId
                }
            }
        },
        (err, data) => {
            if (err) {
                logger.error("models/user/user__addActiveGame : Erreur de lecture/écriture sur la base");
            } else if (data == null) {
                this.update(
                    {
                        username: userId
                    }, 
                    {
                        $push: { activeGames: {
                            score: score,
                            roundOrder: roundOrder,
                            gameId: gameId
                        } }
                    },
                    (err, data) => {
                        if(err && err.code != 11000) {
                            logger.error("models/user/user__addActiveGame : Erreur de lecture/écriture sur la base");
                        }
                    }
                );
            }
            callback(err, data);
        }
    )
}
  
function addActiveGamePlugin(schema, options) {
    schema.statics.addActiveGame = addActiveGame;
}
  
module.exports = addActiveGamePlugin