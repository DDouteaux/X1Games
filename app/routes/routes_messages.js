var logger = require.main.require('./app/loader/logger');

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

// Post message to the database
app.post('/games/:game/messages', (req, res) => {
    logger.route("POST /wordraw/messages");
    timestamp = new Date().getTime();
    req.body.timestamp = timestamp;
    var message = new Message(req.body);

    message.save((err) => {
        if(err) {
            logger.error("POST /wordraw/messages : " + err);
            res.sendStatus(500);
            return false
        }
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})