(function () {
    'use strict';

    // bootstrap menus controllers
    var menus = require('./controllers/menus');

    module.exports = function(app, io) {

        app.route('/api/menus')
            .get(menus.index)
            .post(menus.store);
        app.route('/api/menus/:id')
            .get(menus.show)
            .put(menus.update)
            .delete(menus.destroy);

    };
})();