(function () {
    'use strict';

    module.exports = function(app, io) {

        // bootstrap menus controllers
        var menus = require('./controllers/menus');

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