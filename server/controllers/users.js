(function () {
    'use strict';

    var password = require('passport');
    var User = require('../models/user');

    exports.destroy = function(req, res) {

    };

    exports.index = function(req, res) {

    };

    exports.update = function(req, res) {

    };

    exports.show = function(req, res) {

    };

    exports.store = function(req, res) {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });

        User.findOne({ username: user.username }, function(err, existingUser) {
           if(existingUser) {

           }

            user.save(function(err) {
                if(err) {

                }

            });
        });
    };

})();