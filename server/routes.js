(function () {
    'use strict';

    module.exports = function(app, io) {

        var menus = require('./controllers/menus');
        var user = require('./controllers/users');

        /**
         * Users API routes
         */
        app.route('/api/users')
            .get(function(req, res) {
               users.index(req, res);
            })
            .post(function(req, res) {
                users.store(req, res);
            });


        /**
         * Menus API routes
         */
        app.route('/api/menus')
            .get(function(req, res) {
                menus.index(req, res);
            })
            .post(function(req, res) {
                menus.store(req, res, function(data) {
                    io.sockets.emit('menuAdded', data);
                });
            });
        app.route('/api/menus/:id')
            .get(function(req, res) {
                menus.show(req, res)
            })
            .put(function(req, res) {
                menus.update(req, res, function(data) {
                    io.sockets.emit('menuUpdated', data);
                })
            })
            .delete(function(req, res) {
                menus.destroy(req, res, function(data) {
                    io.sockets.emit('menuDeleted', data);
                });
            });

    };
})();