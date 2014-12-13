(function () {
    'use strict';

    module.exports = function(app, io, jwtAuth) {
        var orders = require('./../controllers/orders');

        app.route('/api/orders')
            .get(jwtAuth, function(req, res) {
                orders.index(req, res, function(data) {

                });
            });
    };
})();