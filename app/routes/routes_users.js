var logger = require.main.require('./app/loader/logger');
var login = require.main.require('./app/controllers/users/login')

module.exports = function(app, baseDir) {
    app.get('/user/signin', (req, res) => {
        logger.route("GET /user/login");
        res.render('user_signin');
    })

    app.post('/user/signin', (req, res) => {
        logger.route("POST /user/login");
        login(req, res);
    })
    
    //app.post('/user/leave', (req, res) => {
    //    logger.route("POST /user/leave");
    //    userLeave(req, res);
    //})
}