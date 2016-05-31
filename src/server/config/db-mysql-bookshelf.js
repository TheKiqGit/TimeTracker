var dbConfig = require('./db-dev-config');
var knex = require('knex')(dbConfig);

var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;