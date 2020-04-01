const newMessage = require('./message__new');
var mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    author : String,
    message : String,
    timestamp : Number,
    gameId: String
})

messageSchema.plugin(newMessage);

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;