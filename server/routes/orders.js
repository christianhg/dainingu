(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var orders = require('./../controllers/orders');

        app.route('/api/orders')
            .get(jwtCheck, function(req, res) {
                orders.index(req, res, function(data) {

                });
            });
    };
})();