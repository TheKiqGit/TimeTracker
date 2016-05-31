var DB = require('../config/db-mysql-bookshelf').DB;

var Task = DB.Model.extend({
    tableName: 'jobs',
    idAtrribute: '_id',
});

var Tasks = DB.Collection.extend({
    model: Task
});

module.exports = {
    Task: Task,
    Tasks: Tasks
};