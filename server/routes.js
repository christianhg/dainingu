(function () {
    'use strict';

    module.exports = function(app, io) {

        var menus = require('./controllers/menus');
        var users = require('./controllers/users');
        var sessions = require('./controllers/sessions');
        var auth = require('./controllers/auth');
        var jwt = require('jsonwebtoken');

        /**
         * Authentication routes.
         */
        app.route('/auth/activateSession')
            .post(function(req, res) {
                auth.activateSession(req, res, function(data) {

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

        /**
         * Users API routes.
         */
        app.route('/api/users')
            .get(function(req, res) {
                users.index(req, res, function(data) {
                    //console.log(data);
                });
            })
            .post(function(req, res) {
                users.store(req, res, function(data) {
                    io.sockets.emit('userAdded', data);
                    //console.log(data);
                });
            });
        app.route('/api/users/:id')
            .get(function(req, res) {

            })
            .put(function(req, res) {

            })
            .delete(function(req, res) {
                users.destroy(req, res, function(data) {
                    //io.sockets.emit('userDeleted', data);
                });
            });

        /**
         * Menus API routes.
         */
        app.route('/api/menus')
            .get(function(req, res) {
                menus.index(req, res, function(data) {
                    //console.log(data);
                });
            })
            .post(function(req, res) {
                menus.store(req, res, function(data) {
                    io.sockets.emit('menuAdded', data);
                    //console.log(data);
                });
            });
        app.route('/api/menus/:id')
            .get(function(req, res) {
                menus.show(req, res, function(data) {
                    //console.log(data);
                })
            })
            .put(function(req, res) {
                menus.update(req, res, function(data) {
                    //io.sockets.emit('menuUpdated', data);
                    //console.log(data);
                })
            })
            .delete(function(req, res) {
                menus.destroy(req, res, function(data) {
                    //io.sockets.emit('menuDeleted', data);
                    //console.log(data);
                });
            });

        /**
         * Session API routes.
         */
        app.route('/api/sessions')
            .get(function(req, res) {
                sessions.index(req, res, function(data) {
                    //console.log(data);
                });
            })
            .post(function(req, res) {
                sessions.store(req, res, function(data) {
                    // io.sockets.emit('sessionAdded', data);
                    //console.log(data);
                });
            });
        app.route('/api/sessions/:id')
            .get(function(req, res) {
                sessions.show(req, res, function(data) {
                    //console.log(data);
                })
            })
            .put(function(req, res) {
                sessions.update(req, res, function(data) {
                    //io.sockets.emit('sessionUpdated', data);
                    //console.log(data);
                })
            })
            .delete(function(req, res) {
                sessions.destroy(req, res, function(data) {
                    //io.sockets.emit('sessionDeleted', data);
                    //console.log(data);
                });
            });

    };
})();