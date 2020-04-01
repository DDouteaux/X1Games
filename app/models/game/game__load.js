var logger = require.main.require('./app/loader/logger');

function loadGame(name, callback) {
    logger.debug("Méthode game__load/loadGame");
    this.findOne(
        { 
            name: name,
            isActive: true
        }, 
        (err, data) => {
            if (err) {
                logger.error("models/game/game__load : Erreur de lecture/écriture sur la base");
            } else if (data == null) {
                logger.info("Aucune partie de " + name + " active n'a été trouvée. Création d'une nouvelle partie.")
                this.newGame(name, callback);
            } else {
                callback(err, data);
            }
        }
    )
}

function loadGamePlugin(schema, options) {
    schema.statics.loadGame = loadGame;
}
  
module.exports = loadGamePlugin;