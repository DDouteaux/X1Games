var Message = require.main.require('./app/models/message/message');
var logger = require.main.require('./app/loader/logger');

function sendMessage(author, gameId, message, req, res) {
    logger.debug("Méthode /controllers/messages/send/sendMessage");
    Message.newMessage(author, message.message, gameId, (err, data) => {
        if (err) {
            logger.error("Le message n'a pas pu être enregistré.");
            logger.error(`Auteur : ${author}`);
            logger.error(`GameId : ${gameId}`);
            logger.error(`Message : ${message.message}`);
            res.sendStatus(500);
            return false;
        } else {
            req.app.get('io').of(`/${gameId}`).emit('message', data);
            res.sendStatus(200);
        }
    });
}

module.exports = sendMessage