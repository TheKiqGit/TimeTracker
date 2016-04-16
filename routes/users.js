var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET users listing. */
userRouter.route('/')
  .get(function(req, res, next) {
      User.forge({'username':'eortega'})
      .fetch()
      .then(function (user) {
        res.json(user);
      });
  });



module.exports = userRouter;