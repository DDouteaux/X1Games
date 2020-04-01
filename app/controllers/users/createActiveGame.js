var User = require.main.require('./app/models/user/user');
var logger = require.main.require('./app/loader/logger');

function createActiveGame(gameId, userId, callback) {
    logger.debug("Méthode controllers/user/createActiveGame/createActiveGame");
    User.nbPlayersInGame(gameId, (err, data) => {
        if (err) {
            logger.error("controllers/user/createActiveGame : Erreur lors de la récupération du nombre de joueurs.")
            logger.error(err);
            return;
        }
        User.addActiveGame(userId, 0, gameId, data, (err, data) => {
            callback(err, data);
        });
    })
}

module.exports = createActiveGame