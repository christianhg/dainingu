(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var dishes = require('./../controllers/dishes');

        app.route('/api/dishes')
            .get(function(req, res) {
                dishes.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                dishes.store(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            });
        app.route('/api/dishes/:id')
            .get(function(req, res) {
                dishes.show(req, res, function(data) {

                })
            })
            .put(jwtCheck, function(req, res) {
                dishes.update(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            })
            .delete(jwtCheck, function(req, res) {
                dishes.destroy(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            });
    };

})();