var mongoose = require('mongoose');

var Message = mongoose.model(
    "Message",
    { 
        author : String,
        message : String,
        timestamp : Number,
        game: String
    }
)

Message.collection.drop(function(err) {});

module.exports = Message;