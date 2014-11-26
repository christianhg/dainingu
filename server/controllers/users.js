(function () {
    'use strict';

    var User = require('../models/mongoose/user');

    /**
     * Delete user.
     */
    exports.destroy = function(req, res, callback) {
        User.findById(req.params.id, function(err, user) {
            user.remove(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'User deleted',
                    user: user
                };

                res.json(data);

                callback(data);
            });
        });
    };

    /**
     * Get all users.
     */
    exports.index = function(req, res, callback) {
        User.find(function(err, users) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Users shown',
                users: users
            };

            res.json(users);

            callback(data);
        })
    };

    /**
     * Get specific user.
     */
    exports.show = function(req, res, callback) {
        var userId = req.params.id;

        User.findById(userId, function(err, user) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'User shown',
                user: user
            };

            res.json(user);

            callback(data);
        });
    };

    /**
     * Add new user.
     */
    exports.store = function(req, res, callback) {
        var user = new User();

        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'User added',
                user: user
            };

            res.json(data);

            callback(data);
        });
    };

    /**
     * Update user.
     * TODO: Needs to be able to update user passwords.
     */
    exports.update = function(req, res, callback) {
        var userId = req.params.id;

        User.findById(userId, function(err, user) {
            if(err) {
                res.send(err);
            }

            user.username = req.body.username;

            user.save(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'User updated',
                    user: user
                };

                res.json(data);

                callback(data);
            });
        });
    };

})();