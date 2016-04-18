var LocalStrategy = require('passport-local').Strategy;
var Model = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
        Model.User.forge({
                username: username
            })
            .fetch().then(function(user) {
                done(null, user);
            });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'


    passport.use(new LocalStrategy(function(username, password, done) {
        Model.User.forge({
                username: username
            }).fetch()
            .then(function(user) {
                if (user === null) {
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                } else {
                    user = user.toJSON();
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {
                            message: 'Invalid username or password'
                        });
                    } else {
                        return done(null, user);
                    }
                }
            });
    }));

    /*
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            process.nextTick(function() {
                User.User.forge({
                        'username': username
                    }).fetch()
                    .then(function(parameters) {
                        //User already registered
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    })
                    .catch(function(err) {
                        User.User.forge({
                                username: username,
                                password: password
                            })
                            .save()
                            .then(function(user) {
                                return done(null, user);
                            });
                    });
            });
        }

    )); */
}