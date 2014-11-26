(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var menusDishes = require('./../controllers/menusDishes');

        app.route('/api/menus/dishes')
            .get(function(req, res) {
                menusDishes.getMenusWithDishes(req, res, function(data) {

                });
            });
        app.route('/api/menus/:menuId/dishes')
            .get(function(req, res) {
                menusDishes.index(req, res, function(data) {

                });
            }).
            post(jwtCheck, function(req, res) {
                menusDishes.store(req, res, function(data) {
                    io.emit('alert', {type: 'success', message: data.message});
                    io.emit('menusDishesUpdated');
                });
            });
        app.route('/api/menus/:menuId/dishes/:dishId')
            .delete(jwtCheck, function(req, res) {
                menusDishes.destroy(req, res, function(data) {
                    io.emit('alert', {type: 'success', message: data.message});
                    io.emit('menusDishesUpdated');
                });
            });
    };

})();