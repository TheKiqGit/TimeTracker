var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET users listing. */
userRouter.route('/')
  .get(function (req, res, next) {
      User.User.forge()
      .fetchAll()
      .then(function (user) {
        res.json(user);
      })
  })
  .post(function(req, res) {
    new User.User({
        username: req.body.username,
        password: req.body.password
      }).save().then(function(model){
        var result = 'User ' + model.get('username') + ' created.';
        return res.status(200).json({message: result, user: model});
      }).catch(function (err) {
        console.log(err);
        return res.status(400).json({message: 'User already exists'});
      });
  }
);



module.exports = userRouter;