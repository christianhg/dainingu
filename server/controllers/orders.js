(function () {
    'use strict';

    var Session = require('../models/mongoose/session');

    /**
     * Get all orders.
     */
    exports.index = function(req, res, callback) {
        Session
            .aggregate()
            .unwind('orders')
            .project({
                _id: 0,
                order: '$orders',
                session: {
                    _id: '$_id'
                }
            })
            .exec(function(err, orders) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'Orders shown',
                    orders: orders
                };

                res.json(orders);

                callback(data);
            });
    };

})();