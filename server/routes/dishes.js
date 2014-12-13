(function () {
    'use strict';

    module.exports = function(app, io, jwtAuth) {
        var dishes = require('./../controllers/dishes');

        /**
         * Dishes CRUD routes.
         */
        app.route('/api/dishes')
            // Get all dishes.
            .get(function(req, res) {
                dishes.index(req, res, function(data) {

                });
            })
            // Store new dish.
            .post(jwtAuth, function(req, res) {
                dishes.store(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });
        app.route('/api/dishes/:id')
            // Get specific dish.
            .get(function(req, res) {
                dishes.show(req, res, function(data) {

                });
            })
            // Update specific dish.
            .put(jwtAuth, function(req, res) {
                dishes.update(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            })
            // Delete specific dish.
            .delete(jwtAuth, function(req, res) {
                dishes.destroy(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                    io.sockets.emit('alert', { type: 'danger', message: data.message });
                });
            });

        /**
         * Add og remove active-flag from sessions
         */
        app.route('/api/dishes/:id/activate')
            // Add active flag.
            .put(jwtAuth, function(req, res) {
                dishes.activate(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            // Remove active flag.
            .delete(jwtAuth, function(req, res) {
                dishes.deactivate(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });
    };

})();