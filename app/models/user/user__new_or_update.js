var logger = require.main.require('./app/loader/logger');

function newOrUpdateUser(username, pseudo, avatar, callback) {
    logger.debug("Méthode models/user__new_or_update/newOrUpdateUser");
    this.findOneAndUpdate(
        { 
            username: username
        }, 
        {
            username: username,
            pseudo: pseudo,
            avatar: avatar,
            isConnected: true
        }, 
        { 
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }, 
        function(err, data) {
            if(err) {
                logger.error("create_token/login : Erreur de lecture/écriture sur la base");
            }
            callback(err, data);
        });
}
  
function newOrUpdateUserPlugin(schema, options) {
    schema.statics.newOrUpdate = newOrUpdateUser;
}
  
module.exports = newOrUpdateUserPlugin;