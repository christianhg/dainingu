(function () {
    'use strict';

    var Menu  = require('../models/menu');

    exports.index = function(req, res) {
        Menu.find(function(err, menus) {
            if(err) {
                res.send(err);
            }
            res.json(menus);
        });
    };

    exports.show = function(req, res) {
        Menu.findById(req.params.id, function(err, menu) {
            if(err) {
                res.send(err);
            }
            res.json(menu);
        });
    };

    exports.store = function(req, res) {
        var menu = new Menu();

        menu.title = req.body.title;

        menu.save(function(err) {
           if(err) {
               res.send(err);
           }

           res.json({message: 'Menu added', data: menu});
        });

    };

    exports.update = function(req, res) {
        Menu.findById(req.params.id, function(err, menu) {
            if(err) {
                res.send(err);
            }

            menu.title = req.body.title;

            menu.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message: 'Menu updated', data: menu});
            });
        });
    };

    exports.destroy = function(req, res) {
        Menu.findById(req.params.id, function(err, menu) {
           menu.remove(function(err) {
               if(err) {
                   res.send(err);
               }
               res.json({message: 'Menu deleted', data: menu});
           });
        });
    };
})();