const disconnect = require('./user__disconnect');
const newOrUpdate = require('./user__new_or_update');
const addActiveGame = require('./user__addActiveGame');
const nbPlayersInGame = require('./user__nbPlayersInGame');
const playersInGame = require('./user__playersInGame');
const removeActiveGames = require('./user__removeActiveGames');
var mongoose = require('mongoose');

const ActiveGameSchema =  mongoose.Schema({
    score: Number,
    roundOrder: Number,
    gameId: String
})

const ScoreHistorySchema = mongoose.Schema({
    score: Number,
    gameId: String
})

const userSchema = mongoose.Schema({
        username: { type: String, unique: true },
        pseudo : String,
        password : String,
        avatar: String,
        isConnected : Boolean,
        scoreHistory : { type: [ScoreHistorySchema], default: [] },
        activeGames : { type: [ActiveGameSchema], default: []}
    })

userSchema.plugin(disconnect);
userSchema.plugin(newOrUpdate);
userSchema.plugin(addActiveGame);
userSchema.plugin(nbPlayersInGame);
userSchema.plugin(playersInGame);
userSchema.plugin(removeActiveGames);

var User = mongoose.model("User", userSchema);

module.exports = User