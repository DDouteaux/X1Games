var logger = require.main.require('./app/loader/logger');

function choseGame(req, res) {
    logger.debug("Méthode controllers/games/chose/choseGame");
    let game = req.body.game;
    let error = "";

    if (!game) {
        logger.debug("   > Pas de jeu sélectionné");
        error = "Veuillez choisir un jeu.";
    }

    if (error) {
        res.redirect("/games?error=" + error.trim());
        return;
    }
    res.status(302).location('/games/' + game).end();
}

module.exports = choseGame