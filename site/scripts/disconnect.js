// Scripts pour gérer la mise à jour de la liste des joueurs à l'arrivée
// d'un nouveau joueur dans la partie.
var socket = io();
socket.on('newPlayerArrives', updatePlayers);
socket.on('playerLeaves', updatePlayers);

console.log("user_join script");

function disconnectUser() {
    io.emit("userLeavePage")
}

function updatePlayers(players) {
    console.log("new user is joining the game !");
    $("#players").empty();
    players.forEach(function(player) {
        $("#players").append(
            `<div>
                <dt class="col-sm-1">#${player.roundOrder}</dd>
                <dt class="col-sm-8">${player.pseudo}</dt>
                <dd class="col-sm-3">${player.score}</dd>
            </div>`
        )
    })
}