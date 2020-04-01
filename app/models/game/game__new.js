var logger = require.main.require('./app/loader/logger');

function newGame(name, callback) {
    logger.debug("Méthode game__new/newGame");
    startDate = new Date().getTime();
    this.create(
        {
            name: name,
            startDate: startDate,
            isActive: true,
            id: name + "_" + startDate
        },
        (err, data) => {
            if(err) {
                logger.error("models/game/game__new : Erreur de lecture/écriture sur la base");
            }
            callback(err, data);
        }
    );
}

function newGamePlugin(schema, options) {
    schema.statics.newGame = newGame;
}
  
module.exports = newGamePlugin;