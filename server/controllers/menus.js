(function () {
    'use strict';

    var Menu  = require('../models/menu');

    exports.destroy = function(req, res, callback) {
        Menu.findById(req.params.id, function(err, menu) {
            menu.remove(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'Menu deleted',
                    menu: menu
                };

                res.json(data);

                callback(data);
            });
        });
    };

    exports.index = function(req, res, callback) {
        Menu.find(function(err, menus) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Menus shown',
                menus: menus
            };

            res.json(menus);

            callback(data);
        });
    };

    exports.show = function(req, res, callback) {
        Menu.findById(req.params.id, function(err, menu) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Menu shown',
                menus: menu
            };

            res.json(menu);

            callback(data);
        });
    };

    exports.store = function(req, res, callback) {
        var menu = new Menu();

        menu.name = req.body.name;

        menu.save(function (err) {
            if (err) {
                res.send(err);
            }
            var data = {
                message: 'Menu added',
                menu: menu
            };

            res.json(data);

            callback(data);
        });
    };

    exports.update = function(req, res, callback) {
        Menu.findById(req.params.id, function(err, menu) {
            if(err) {
                res.send(err);
            }

            menu.title = req.body.title;

            menu.save(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'Menu updated',
                    menu: menu
                };

                res.json({message: 'Menu updated'});

                callback(data);
            });
        });
    };

})();