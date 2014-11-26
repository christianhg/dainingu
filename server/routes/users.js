(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var users = require('./../controllers/users');

        app.route('/api/users')
            .get(jwtCheck, function(req, res) {
                users.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                users.store(req, res, function(data) {
                    io.sockets.emit('users:add');
                    io.sockets.emit('alert', {type: 'success', message: data.message});
                });
            });
        app.route('/api/users/:id')
            .get(jwtCheck, function(req, res) {
                users.show(req, res, function(data) {

                });
            })
            .put(jwtCheck, function(req, res) {
                users.update(req, res, function(data) {

                });
            })
            .delete(jwtCheck, function(req, res) {
                users.destroy(req, res, function(data) {
                    io.sockets.emit('alert', {type: 'success', message: data.message});
                });
            });
    };

})();