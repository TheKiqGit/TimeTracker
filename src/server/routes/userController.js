var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var Model = require('../models/user');
var authenticate = require('./auth');



/* GET all the users */
exports.getAll = function(req, res, next) {
    Model.Users.forge()
    .fetch({ columns: ['_id', 'username', 'admin'] })
    .then(function(user) {
        res.json(user);
    }).catch(function(err) {
        console.log(err);
    });
};

/* GET a user given its id */
exports.getUser = function(req, res, next) {
  var userID = req.params.userID;
  Model.User.forge({'_id':userID})
    .fetch({columns:['_id', 'username', 'admin']})
    .then(function (user) {
      res.json(user);
    });
};

/* PUT update a user given its id */
exports.updateUser = function(req, res, next) {
  
  var userID = req.params.userID;

  Model.User.forge({'_id':userID})
    .fetch({columns:['_id', 'username', 'admin']})
    .then(function (user) {
      res.json(user);
    });
};

/* GET logout */
exports.signOut = function(req, res){
  req.logout();
  res.status(200).json({message: 'Login user out'});
};


/* POST login. */
exports.signIn = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    return req.logIn(user, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Could not log in user'
        });
      }

      var token = authenticate.getToken(user);

      res.status(200).json({
        status: 'Login successful',
        succes: true,
        token: token
      });
    });
  })(req, res, next);
};

/* POST Register. */
exports.signUp = function(req, res, next) {
  var userData = req.body;

  Model.User.forge({
      username: userData.username
    }).fetch() //see if user already exists
    .then(function(user) {
      if (user) {
        return res.status(400).json({
          title: 'signup',
          errorMessage: 'That username already exists'
        });
      } else {
        //User does not existe, lets add it
        var signUpUser = Model.User.forge({
          username: userData.username,
          password: userData.password,
          admin: false
        });

        signUpUser.save()
          .then(function(user) {
            var result = 'User ' + user.get('username') + ' created.';
            return res.status(200).json({
              message: result,
              user: {
                id: user.get('id'),
                username: user.get('username'),
              }
            });
          });
      }
    });
};
