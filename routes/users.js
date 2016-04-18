var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var Model = require('../models/user');
var verify = require('./verifyTokens');

/* GET users listing. */
userRouter.route('/')
  .get(function(req, res, next) {
    Model.User.forge()
      .fetchAll()
      .then(function(user) {
        res.json(user);
      })
  });

userRouter.post('/signup', function(req, res, next) {
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
});

userRouter.post('/signin', function(req, res, next) {
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
                return res.status(500).json({ error: 'Cound not log in user' });
            }
            console.log('User in users: ', user);
            var token = verify.getToken(user);

            res.status(200).json({
                status: 'Login successful',
                succes: true,
                token: token
            });
        });
  })(req, res, next);
});

/*
  userRouter.route('/signup')
  .post(,function(req, res) {
    new User.User({
        username: req.body.username,
        password: req.body.password,
        admin: false
      }).save().then(function(model){
        var result = 'User ' + model.get('username') + ' created.';
        return res.status(200).json({
          message: result, 
          user: {
            id: model.get('id'),
            username: model.get('username'),
          }
        });
      }).catch(function (err) {
        return res.status(400).json({message: 'User already exists'});
      });
  }
); */



module.exports = userRouter;