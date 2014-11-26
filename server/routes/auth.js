(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var auth = require('./../controllers/auth');

        /**
         * Route for activating a session without session id.
         */
        app.route('/auth/activateSession')
            .post(function(req, res) {
                auth.activateSession(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                });
            });

        app.route('/auth/getSessionId')
            .post(function(req, res) {
                auth.getSessionId(req, res, function(data) {

                });
            });

        app.route('/auth/signin')
            .post(function(req, res) {
                auth.signin(req, res, function(isAuthenticated, data) {

                });
            });

        app.route('/auth/validateLoginToken')
            .post(function(req, res) {
                auth.validateLoginToken(req, res, function(data) {

                });
            });

        app.route('/auth/validateMenucardToken')
            .post(function(req, res) {
                auth.validateMenucardToken(req, res, function(data) {

                });
            });
    };

})();