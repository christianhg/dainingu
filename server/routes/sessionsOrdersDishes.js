(function () {
    'use strict';

    module.exports = function(app, io, jwtAuth) {
        var sessionsOrdersDishes = require('./../controllers/sessionsOrdersDishes');

        /**
         * Dishes in specific order in specific session.
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/dishes')
            .get(jwtAuth, function(req, res) {
                sessionsOrdersDishes.index(req, res, function(data) {

                });
            })
            .post(jwtAuth, function(req, res) {
                sessionsOrdersDishes.store(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });

        /**
         * Specific dish in specific order in specific session.
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/dishes/:dishId')
            .get(jwtAuth, function(req, res) {
                sessionsOrdersDishes.show(req, res, function(data) {

                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrdersDishes.destroy(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'danger', message: data.message });
                });
            });
    };

})();