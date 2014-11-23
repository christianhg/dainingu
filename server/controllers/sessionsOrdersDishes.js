(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');

    exports.index = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.findDishes(orderId, function(dishes) {
                res.send(dishes);
            });
        });
    };

    exports.show = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dishId = req.params.dishId;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.findDish(orderId, dishId, function(dish) {
                res.send(dish);
            });
        });

    };

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

                    res.send(session);
                });
            });
        });
    };

    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dish = req.body.dish;

        Session.findOne({_id: sessionId}, function(err, session) {
            session.addDish(orderId, dish, function(dishes) {
                session.save(function(err) {
                    if(err) {
                        res.send(err);
                    }

                    res.send(session);
                });
            });
        });
    };
})();