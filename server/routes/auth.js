(function () {
    'use strict';

    module.exports = function(app, io) {
        var auth = require('./../controllers/auth');

        /**
         * Sign up.
         */
        app.route('/api/auth/signup')
            .post(function(req, res) {
                auth.signup(req, res, function(data) {
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });

        /**
         * Sign in.
         */
        app.route('/api/auth/signin')
            .post(function(req, res) {
                auth.signin(req, res, function(data) {
                    console.log(data);
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });

        /**
         * Validate logged in user.
         */
        app.route('/api/auth/validate')
            .post(function(req, res) {
                auth.validate(req, res, function(data) {

                });
            });
    };

})();