(function () {
    'use strict';

    var Menu  = require('../models/menu');

    exports.getMenus = function(req, res) {
        Menu.find(function(err, menus) {
            if(err) {
                res.send(err);
            }
            res.json(movies);
        });
    };
})();