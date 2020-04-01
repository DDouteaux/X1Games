var logger = require.main.require('./app/loader/logger');

function newMessage(author, message, gameId, callback) {
    logger.debug("Méthode message__new/newMessage");
    timestamp = new Date().getTime();
    this.create(
        {
            author: author,
            message: message,
            gameId: gameId,
            timestamp: timestamp
        },
        (err, data) => {
            if(err) {
                logger.error("models/message/message__new : Erreur de lecture/écriture sur la base");
            }
            callback(err, data);
        }
    );
}

function newMessagePlugin(schema, options) {
    schema.statics.newMessage = newMessage;
}
  
module.exports = newMessagePlugin;