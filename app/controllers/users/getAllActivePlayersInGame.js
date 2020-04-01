var User = require.main.require('./app/models/user/user');
var logger = require.main.require('./app/loader/logger');

function getAllActivePlayersInGame(gameId, callback) {
    logger.debug("Méthode controllers/user/getAllActivePlayersInGame/getAllActivePlayersInGame");
    User.getAllInGame(gameId, (err, data) => {
        if (err) {
            logger.error(`controllers/user/getAllActivePlayersInGame : Erreur lors de la récupération des joueurs du jeu ${gameId}.`)
            logger.error(err);
            return;
        }
        data.forEach( (player) => {
            player.activeGames = player.activeGames.filter(game => game.gameId == gameId);
        });
        data.filter( (player) => {
            player.activeGames.length 
        });
        callback(err, data);
    });
}

module.exports = getAllActivePlayersInGame