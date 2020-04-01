let jwt = require('jsonwebtoken');
let messages = require.main.require('./app/config/messages');
var logger = require.main.require('./app/loader/logger');

let checkToken = (req, res, next) => {
    logger.debug("Méthode controllers/users/check/checkToken");
    tokenError = null;
    if (req._parsedUrl.pathname === '/user/signin' || req._parsedUrl.pathname === '/' ) {
        // Connexion page, you should not have a token
        next();
    } else if(req.cookies["token"] != undefined) {
        // Normal page, you should have a token
        jwt.verify(req.cookies["token"], process.env.JWTHASH, (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    logger.debug("   > Le token est expiré");
                    tokenError = messages.token.expired;
                } else {
                    logger.debug("   > Le token est invalide");
                    tokenError = messages.token.invalid;
                }
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // Normal page and no token, return to login
        logger.debug("   > Le token n'est pas fourni");
        tokenError = messages.token.missing;
    }
    if (tokenError != null) {
        res.redirect('/?error=' + encodeURIComponent(tokenError));
    }
};

module.exports = checkToken