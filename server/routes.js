(function () {
    'use strict';

    module.exports = function(app, io) {

        var menus = require('./controllers/menus');
        var users = require('./controllers/users');
        var sessions = require('./controllers/sessions');

        /**
         * Users API routes
         */
        app.route('/api/users')
            .get(function(req, res) {
                users.index(req, res, function(data) {
                    console.log(data);
                });
            })
            .post(function(req, res) {
                users.store(req, res, function(data) {
                    io.sockets.emit('userAdded', data);
                    console.log(data);
                });
            });


        /**
         * Menus API routes
         */
        app.route('/api/menus')
            .get(function(req, res) {
                menus.index(req, res, function(data) {
                    console.log(data);
                });
            })
            .post(function(req, res) {
                menus.store(req, res, function(data) {
                    io.sockets.emit('menuAdded', data);
                    console.log(data);
                });
            });
        app.route('/api/menus/:id')
            .get(function(req, res) {
                menus.show(req, res, function(data) {
                    console.log(data);
                })
            })
            .put(function(req, res) {
                menus.update(req, res, function(data) {
                    io.sockets.emit('menuUpdated', data);
                    console.log(data);
                })
            })
            .delete(function(req, res) {
                menus.destroy(req, res, function(data) {
                    io.sockets.emit('menuDeleted', data);
                    console.log(data);
                });
            });

        /**
         * Session API routes
         */
        app.route('/api/sessions')
            .get(function(req, res) {
                sessions.index(req, res, function(data) {
                    console.log(data);
                });
            })
            .post(function(req, res) {
                sessions.store(req, res, function(data) {
                    io.sockets.emit('sessionAdded', data);
                    console.log(data);
                });
            });
        app.route('/api/sessions/:id')
            .get(function(req, res) {
                sessions.show(req, res, function(data) {
                    console.log(data);
                })
            })
            .put(function(req, res) {
                sessions.update(req, res, function(data) {
                    io.sockets.emit('sessionUpdated', data);
                    console.log(data);
                })
            })
            .delete(function(req, res) {
                sessions.destroy(req, res, function(data) {
                    io.sockets.emit('sessionDeleted', data);
                    console.log(data);
                });
            });

    };
})();