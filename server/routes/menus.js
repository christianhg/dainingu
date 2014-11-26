(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var menus = require('./../controllers/menus');

        app.route('/api/menus')
            .get(function(req, res) {
                menus.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                menus.store(req, res, function(data) {
                    io.sockets.emit('menus:add');
                    io.sockets.emit('alert', {type: 'success', message: data.message});
                });
            });
        app.route('/api/menus/:id')
            .get(function(req, res) {
                menus.show(req, res, function(data) {

                });
            })
            .put(jwtCheck, function(req, res) {
                menus.update(req, res, function(data) {
                    io.sockets.emit('menus:update');
                    io.sockets.emit('alert', {type: 'success', message: data.message});
                });
            })
            .delete(jwtCheck, function(req, res) {
                menus.destroy(req, res, function(data) {
                    io.sockets.emit('menus:delete');
                    io.sockets.emit('alert', {type: 'success', message: data.message});
                });
            });
    };

})();