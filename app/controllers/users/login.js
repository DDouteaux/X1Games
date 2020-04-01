var User = require.main.require('./app/models/user/user');
let jwt = require('jsonwebtoken');
var logger = require.main.require('./app/loader/logger');

function login (req, res) {
    logger.debug("Méthode controllers/users/login/login");
    let pseudo = req.body.pseudo;
    let avatar = req.body.avatar;
    let error = "";

    if (!pseudo) {
        logger.debug("   > Pas de pseudo fourni");
        error = "Veuillez saisir un pseudo.";
    }
    if (!avatar) {
        logger.debug("   > Pas d'avatar sélectionné");
        error += " Veuillez choisir un avatar."
    }
    if (error) {
        res.clearCookie("token");
        res.redirect("/user/signin?error=" + error.trim());
        return;
    }

    let username = pseudo.toLowerCase();
    avatar = avatar.replace("_", " ");
    User.newOrUpdate(username, pseudo, avatar, (err, data) => {
        if(err) {
            res.redirect("/user/signin?error=" + err);
            return;
        }
        authenticateUser(pseudo, avatar, req, res);
    });
}

function authenticateUser(pseudo, avatar, req, res) {
    logger.debug("Méthode controllers/users/login/authenticateUser");
    let token = jwt.sign({
            username: pseudo.toLowerCase(),
            pseudo: pseudo,
            avatar: avatar
        },
        process.env.JWTHASH,
        {
            expiresIn: '12h'
        }
    );
    res.clearCookie("token");
    res.cookie('token', token);
    res.status(302).location('/games').end();
}

module.exports = login