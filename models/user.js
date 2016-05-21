var DB = require('../config/db-mysql-bookshelf').DB;
var bcrypt = require('bcrypt-nodejs');

var User = DB.Model.extend({
    tableName: 'users',
    idAtrribute: '_id',
    initialize: function() {
        this.on('creating', this.hashPassword, this);
    },
    hashPassword: function(model, attrs, options) {
        var hash = bcrypt.hashSync(model.attributes.password, bcrypt.genSaltSync(10));
        model.set('password', hash);
    }
});

var Users = DB.Collection.extend({
    model: User
});

module.exports = {
    User: User,
    Users: Users
};
