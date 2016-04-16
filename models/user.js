var DB = require('../config/db-mysql-bookshelf').DB;

var User = DB.Model.extend({
   tableName: 'users' 
});

module.exports = User;
