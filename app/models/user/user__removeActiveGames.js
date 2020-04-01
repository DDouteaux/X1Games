var logger = require.main.require('./app/loader/logger');

function removeAllActivePlayers() {
    logger.debug("Méthode models/user/user__removeAllActiveGames/removeAllActivePlayers");
    // TODO Save activeGames scores in scoreHistory
    this.remove(
        {
            $set: { activeGames: [] }
        },
        (err, data) => {
        logger.error("models/user/user__removeAllActiveGames : Erreur de lecture/écriture sur la base");
    })
}
  
function removeAllActivePlayersPlugin(schema, options) {
    schema.statics.removeAllActivePlayers = removeAllActivePlayers;
}
  
module.exports = removeAllActivePlayersPlugin