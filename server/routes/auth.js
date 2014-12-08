(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var auth = require('./../controllers/auth');

        /**
         *
         */
        app.route('/api/auth/signin')
            .post(function(req, res) {
                auth.signin(req, res, function(isAuthenticated, data) {

                });
            });

        /**
         *
         */
        app.route('/api/auth/validate')
            .post(function(req, res) {
                auth.validate(req, res, function(data) {

                });
            });
    };

})();