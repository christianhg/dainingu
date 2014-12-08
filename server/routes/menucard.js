(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var menucard = require('./../controllers/menucard');

        app.route('/api/menucard/orders')
            .get(jwtCheck, function(req, res) {
                menucard.orders(req, res, function(data) {
                    //io.sockets.emit('ordersUpdated', data);
                });
            })
            .post(jwtCheck, function(req, res) {
                menucard.addOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/commit')
            .post(jwtCheck, function(req, res) {
                menucard.commitOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/return')
            .post(jwtCheck, function(req, res) {
                menucard.returnOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/orders/dishes')
            .post(jwtCheck, function(req, res) {
                menucard.addDishToOrder(req, res, function(data) {
                    io.sockets.emit('ordersUpdated');
                });
            });

        app.route('/api/menucard/session')
            .get(jwtCheck, function(req, res) {
                menucard.getSession(req, res, function(data) {
                    //io.sockets.emit('ordersUpdated', data);
                });
            });


    };
})();