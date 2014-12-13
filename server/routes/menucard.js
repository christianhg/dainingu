(function () {
    'use strict';

    module.exports = function(app, io, jwtAuthMenucard) {
        var menucard = require('./../controllers/menucard');

        app.route('/api/menucard/orders')
            // Get all menucard orders.
            .get(jwtAuthMenucard, function(req, res) {
                menucard.orders(req, res, function(data) {

                });
            })
            // Add new menucard order.
            .post(jwtAuthMenucard, function(req, res) {
                menucard.addOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/commit')
            // Flag menucard order as committed.
            .put(jwtAuthMenucard, function(req, res) {
                menucard.commitOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/return')
            // Flag menucard order as returned.
            .put(jwtAuthMenucard, function(req, res) {
                menucard.returnOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/dishes')
            // Add dish to menucard order.
            .post(jwtAuthMenucard, function(req, res) {
                menucard.addDishToOrder(req, res, function(data) {
                    console.log(data);
                    io.sockets.emit('ordersUpdated');
                });
            })
            .put(jwtAuthMenucard, function(req, res) {
                menucard.removeDishFromOrder(req, res, function(data) {
                    console.log(data);
                    io.sockets.emit('ordersUpdated');
                });
            });


        app.route('/api/menucard/session')
            // Get menucard session.
            .get(jwtAuthMenucard, function(req, res) {
                menucard.getSession(req, res, function(data) {

                });
            });


    };
})();