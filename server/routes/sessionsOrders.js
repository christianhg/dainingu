(function () {
    'use strict';

    module.exports = function(app, io, jwtAuth) {
        var sessionsOrders = require('./../controllers/sessionsOrders');

        /**
         * Orders in specific session
         */
        app.route('/api/sessions/:sessionId/orders')
            .get(jwtAuth, function(req, res) {
                sessionsOrders.index(req, res, function(data) {

                });
            })
            .post(jwtAuth, function(req, res) {
                sessionsOrders.store(req, res, function(data) {
                    io.sockets.emit('ordersUpdated', data);
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });

        /**
         * Specific order in specific session
         */
        app.route('/api/sessions/:sessionId/orders/:orderId')
            .get(jwtAuth, function(req, res) {
                sessionsOrders.show(req, res, function(data) {

                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.destroy(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'danger', message: data.message });
                });
            });

        /**
         * Add or remove committed-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/commit')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.commit(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.pull(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add or remove confirmed-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/confirm')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.confirm(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.reject(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add or remove begun-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/begin')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.begin(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.stop(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add or remove completed-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/complete')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.complete(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.incomplete(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add or remove served-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/serve')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.serve(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.return(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add or remove closed-flag from order
         */
        app.route('/api/sessions/:sessionId/orders/:orderId/close')
            .put(jwtAuth, function(req, res) {
                sessionsOrders.close(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                sessionsOrders.open(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });
    };

})();