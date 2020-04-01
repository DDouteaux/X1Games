const newGame = require('./game__new');
const loadGame = require('./game__load');
var mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
        id: { type: String, unique: true},
        name: String,
        startDate: String,
        isActive: Boolean
    })

gameSchema.plugin(newGame);
gameSchema.plugin(loadGame);

var Game = mongoose.model("Game", gameSchema);

module.exports = Game