(function () {
    'use strict';

    module.exports = function(app, io) {

        var dishes = require('./controllers/dishes');
        var menus = require('./controllers/menus');
        var menusDishes = require('./controllers/menusDishes');
        var users = require('./controllers/users');
        var sessions = require('./controllers/sessions');
        var sessionsDishes = require('./controllers/sessionsDishes');
        var sessionsOrders = require('./controllers/sessionsOrders');
        var sessionsOrdersDishes = require('./controllers/sessionsOrdersDishes');
        var auth = require('./controllers/auth');
        var expressJwt = require('express-jwt');
        var jwt = require('jsonwebtoken');
        var secrets = require('./config/secrets');

        /**
         * Authentication routes.
         */
        app.route('/auth/activateSession')
            .post(function(req, res) {
                auth.activateSession(req, res, function(data) {

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

        /**
         * Users API routes.
         */
        app.route('/api/users')
            .get(expressJwt({secret: secrets.jwt_secret}), function(req, res) {
                users.index(req, res, function(data) {

                });
            })
            .post(function(req, res) {
                users.store(req, res, function(data) {
                    io.sockets.emit('userAdded', data);

                });
            });
        app.route('/api/users/:id')
            .get(function(req, res) {

            })
            .put(function(req, res) {

            })
            .delete(function(req, res) {
                users.destroy(req, res, function(data) {
                    io.sockets.emit('userDeleted', data);
                });
            });

        /**
         * Menus API routes.
         */
        app.route('/api/menus')
            .get(function(req, res) {
                menus.index(req, res, function(data) {

                });
            })
            .post(function(req, res) {
                menus.store(req, res, function(data) {
                    io.sockets.emit('menuAdded', data);
                });
            });
        app.route('/api/menus/:id')
            .get(function(req, res) {
                menus.show(req, res, function(data) {

                });
            })
            .put(function(req, res) {
                menus.update(req, res, function(data) {
                    io.sockets.emit('menuUpdated', data);

                });
            })
            .delete(function(req, res) {
                menus.destroy(req, res, function(data) {
                    io.sockets.emit('menuDeleted', data);

                });
            });

        /**
         * Menus Dishes API routes.
         */
        app.route('/api/menus/dishes')
            .get(function(req, res) {
                menusDishes.getMenusWithDishes(req, res, function(data) {

                });
            });
        app.route('/api/menus/:menuId/dishes')
            .get(function(req, res) {
                menusDishes.index(req, res, function(data) {

                });
            }).
            post(function(req, res) {
                menusDishes.store(req, res, function(data) {

                });
            });
        app.route('/api/menus/:menuId/dishes/:dishId')
            .delete(function(req, res) {
                menusDishes.destroy(req, res, function(data) {

                });
            });

        /**
         * Dishes API routes.
         */
        app.route('/api/dishes')
            .get(function(req, res) {
                dishes.index(req, res, function(data) {

                });
            })
            .post(function(req, res) {
                dishes.store(req, res, function(data) {

                });
            });
        app.route('/api/dishes/:id')
            .get(function(req, res) {
                dishes.show(req, res, function(data) {

                })
            })
            .put(function(req, res) {
                dishes.update(req, res, function(data) {

                });
            })
            .delete(function(req, res) {
                dishes.destroy(req, res, function(data) {

                });
            });

        /**
         * Session API routes.
         */
        app.route('/api/sessions')
            .get(function(req, res) {
                sessions.index(req, res, function(data) {

                });
            })
            .post(function(req, res) {
                sessions.store(req, res, function(data) {
                    io.sockets.emit('sessionAdded', data);

                });
            });
        app.route('/api/sessions/:id')
            .get(function(req, res) {
                sessions.show(req, res, function(data) {

                })
            })
            .put(function(req, res) {
                sessions.update(req, res, function(data) {
                    io.sockets.emit('sessionUpdated', data);
                })
            })
            .delete(function(req, res) {
                sessions.destroy(req, res, function(data) {
                    io.sockets.emit('sessionDeleted', data);
                });
            });

        app.route('/api/sessions/:id/dishes')
            .post(function(req, res) {
                sessionsDishes.store(req, res, function(data) {
                    io.sockets.emit('sessionUpdated', data);
                });
            });


        app.route('/api/sessions/:sessionId/orders')
            .get(function(req, res) {
                sessionsOrders.index(req, res, function(data) {

                });
            })
            .post(function(req, res) {
                sessionsOrders.store(req, res, function(data) {

                });
            });
        app.route('/api/sessions/:sessionId/orders/:orderId')
            .get(function(req, res) {
                sessionsOrders.show(req, res, function(data) {

                });
            });

        app.route('/api/sessions/:sessionId/orders/:orderId/dishes')
            .post(function(req, res) {
                sessionsOrdersDishes.store(req, res, function(data) {

                });
            });


    };
})();