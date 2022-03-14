const { Db } = require('mongodb');

module.exports = function(app, db) {
   
    require('./server/service/admin/user')(app, db);

};