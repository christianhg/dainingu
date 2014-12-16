(function () {
    'use strict';

    var Session = require('../models/mongoose/session');

    /**
     * Delete dish in specific order in specific session.
     */
    exports.destroy = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dishId = req.params.dishId;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.removeDish(orderId, dishId, function(dish) {
                session.save(function(err) {
                    if(err) {
                        res.send(err);
                    }

                    var data = {
                        message: 'Ret slettet fra ordre',
                        dish: dish
                    };

                    res.send(dish);

                    callback(data);
                });
            });
        });
    };

    /**
     * Get all dishes in specific order in specific session.
     */
    exports.index = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.findDishes(orderId, function(dishes) {
                var data = {
                    message: 'Retter til ordre vist',
                    dishes: dishes
                };

                res.send(dishes);

                callback(data);
            });
        });
    };

    /**
     * Get specific dish in specific order in specific session.
     */
    exports.show = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dishId = req.params.dishId;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.findDish(orderId, dishId, function(dish) {
                var data = {
                    message: 'Ret til ordre vist',
                    dish: dish
                };

                res.send(dish);

                callback(data);
            });
        });

    };

    /**
     * Add dish to specific order in specific session.
     */
    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dish = req.body;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.addDish(orderId, dish, function(dishes) {
                session.save(function(err) {
                    if(err) {
                        res.send(err);
                    }

                    var data = {
                        message: 'Ret gemt til ordre',
                        dish: dish
                    };

                    res.send(dish);

                    callback(data);
                });
            });
        });
    };
})();