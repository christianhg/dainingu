(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var auth = require('./../controllers/authMenucard');

        /**
         * Route for activating a session without session id.
         */
        app.route('/auth/menucard/activate')
            .post(function(req, res) {
                auth.activate(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                });
            });

        app.route('/auth/menucard/getSessionId')
            .post(function(req, res) {
                auth.getSessionId(req, res, function(data) {

                });
            });

        app.route('/auth/menucard/validate')
            .post(function(req, res) {
                auth.validate(req, res, function(data) {

                });
            });
    };

})();