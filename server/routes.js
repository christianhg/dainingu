(function () {
    'use strict';

    // bootstrap menus controllers
    var menus = require('./controllers/menus');

    module.exports = function(app) {

        app.route('api/menus')
            .get(menus.getMenus);

    };
})();