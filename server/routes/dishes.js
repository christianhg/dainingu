(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
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
            .post(jwtCheck, function(req, res) {
                dishes.store(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            });
        app.route('/api/dishes/:id')
            // Get specific dish.
            .get(function(req, res) {
                dishes.show(req, res, function(data) {

                });
            })
            // Update specific dish.
            .put(jwtCheck, function(req, res) {
                dishes.update(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            })
            // Delete specific dish.
            .delete(jwtCheck, function(req, res) {
                dishes.destroy(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            });

        /**
         * Add og remove active-flag from sessions
         */
        app.route('/api/dishes/:id/activate')
            // Add active flag.
            .put(jwtCheck, function(req, res) {
                dishes.activate(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            })
            // Remove active flag.
            .delete(jwtCheck, function(req, res) {
                dishes.deactivate(req, res, function(data) {
                    io.sockets.emit('dishesUpdated');
                });
            });
    };

})();