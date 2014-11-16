(function () {
    'use strict';

    var LocalStrategy = require('passport-local').Strategy;
    var passport = require('passport');
    var User = require('../models/user');
    var secrets = require('secrets');

    passport.serializeUser(function(user, done) {
       done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username'
    },
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if(err) {
                return done(err);
            }

            var message = {
                message: 'Username and password combination is wrong'
            };

            if(!user) {
                return done(null, false, message);
            }

            user.comparePassword(password, function(err, isMatch) {
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, message)
                }
            })
        })
    }))

})();