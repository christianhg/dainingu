(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');
    var Order = require('../models/order');

    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.orders.find({ _id: orderId }, function(err, order) {
                    if(err) {
                        res.send(err);
                    }

                    res.send(order);
                });


            }
        });

    };


/*    exports.store = function(req, res, callback) {
        var sessionId = req.params.id;
        var dish = req.body.dish;
        var menucardToken = req.body.token;

        jwt.verify(menucardToken, secrets.jwt_secret, function(err, sessionId) {

            Session.findOne({ _id: sessionId }, function(err, session) {
                if(err) {
                    res.send(err);
                }

                if(!session) {
                    res.send(false);
                } else {
                    session.addDish(dish, function(dishes) {
                        session.save();

                        var data = {
                            message: 'Session updated',
                            dishes: dishes
                        };

                        res.json(dishes);

                        callback(data);
                    });
                }
            });
        })
    };*/

})();