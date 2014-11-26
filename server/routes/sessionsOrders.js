(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var sessionsOrders = require('./../controllers/sessionsOrders');

        /**
         * Orders in specific session
         */
        app.route('/api/sessions/:sessionId/orders')
            .get(jwtCheck, function(req, res) {
                sessionsOrders.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                sessionsOrders.store(req, res, function(data) {
                    io.sockets.emit('ordersUpdated', data);
                });
            });

        /**
         * Specific order in specific session
         */
        app.route('/api/sessions/:sessionId/orders/:orderId')
            .get(jwtCheck, function(req, res) {
                sessionsOrders.show(req, res, function(data) {

                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrders.destroy(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        /**
         * Add or remove commit-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/commit')
            .put(jwtCheck, function(req, res) {
                sessionsOrders.commit(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrders.pull(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        /**
         * Add or remove confirm-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/confirm')
            .put(jwtCheck, function(req, res) {
                sessionsOrders.confirm(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrders.reject(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        /**
         * Add or remove complete-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/complete')
            .put(jwtCheck, function(req, res) {
                sessionsOrders.complete(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrders.incomplete(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        /**
         * Add or remove close-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/close')
            .put(jwtCheck, function(req, res) {
                sessionsOrders.close(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessionsOrders.open(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });
    };

})();