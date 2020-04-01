var sendMessage = require.main.require('./app/controllers/messages/send');
var logger = require.main.require('./app/loader/logger');

/*
// Get all messages from the database
app.get('/games/:game/messages', (req, res) => {
    logger.route("GET /wordraw/messages");
    Message.find(
        { message: { $exists: true } },
        (err, messages)=> {
            res.send(messages);
        }
    )
})
*/
module.exports = function(app, baseDir) {
    // Post message to the database
    app.post('/games/:gameId/messages', (req, res) => {
        logger.route("POST /games/:gameId/messages");
        sendMessage(req.decoded.username, req.params.gameId, req.body, req, res);
    });
}