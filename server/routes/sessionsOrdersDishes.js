(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var sessionsOrdersDishes = require('./../controllers/sessionsOrdersDishes');

        /**
         * Dishes in specific order in specific session.
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/dishes')
            .get(jwtCheck, function(req, res) {
                sessionsOrdersDishes.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                sessionsOrdersDishes.store(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                });
            });

        /**
         * Specific dish in specific order in specific session.
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/dishes/:dishId')
            .get(jwtCheck, function(req, res) {
                sessionsOrdersDishes.show(req, res, function(data) {

                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrdersDishes.destroy(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                });
            });
    };

})();