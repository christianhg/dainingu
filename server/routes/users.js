(function () {
    'use strict';

    module.exports = function(app, io, jwtAuth) {
        var users = require('./../controllers/users');

        app.route('/api/users')
            .get(jwtAuth, function(req, res) {
                users.index(req, res, function(data) {

                });
            })
            .post(jwtAuth, function(req, res) {
                users.store(req, res, function(data) {
                    io.sockets.emit('userAdded', data);
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });
        app.route('/api/users/:id')
            .get(jwtAuth, function(req, res) {
                users.show(req, res, function(data) {

                });
            })
            .put(jwtAuth, function(req, res) {
                users.update(req, res, function(data) {
                    io.sockets.emit('userUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            })
            .delete(jwtAuth, function(req, res) {
                users.destroy(req, res, function(data) {
                    io.sockets.emit('userDeleted');
                    io.sockets.emit('alert', { type: 'danger', message: data.message });
                });
            });
    };

})();