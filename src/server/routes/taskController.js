var express = require('express');
var userRouter = express.Router();
var Model = require('../models/task');
var authenticate = require('./auth');

/* GET all the tasks */
exports.getAll = function(req, res, next) {
    Model.Tasks.forge()
        .fetch()
        .then(function(task) {
            res.json(task);
        }).catch(function(err) {
            console.log(err);
        });
};