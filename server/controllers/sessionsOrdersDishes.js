(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');

    exports.index = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            for(var i = 0; i < session.orders.length; i++) {
                if(session.orders[i]._id == orderId) {
                    res.send(session.orders[i].dishes);

                    break;
                }
            }
        });
    };

    exports.show = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dishId = req.params.dishId;

        Session.findOne({_id: sessionId}, function(err, session) {
            for(var i = 0; i < session.orders.length; i++) {
                if(session.orders[i]._id == orderId) {

                    for(var j = 0; j < session.orders[i].dishes.length; j++) {
                        if(session.orders[i].dishes[j]._id == dishId) {
                            res.send(session.orders[i].dishes[j]);

                            break;
                        }
                    }

                }
            }
        });

    };

    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;
        var dish = req.body.dish;

        Session.findOne({_id: sessionId}, function(err, session) {

            for(var i = 0; i < session.orders.length; i++) {
                if(session.orders[i]._id == orderId) {
                    session.orders[i].dishes.push(dish);

                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        res.send(session);
                    });

                    break;
                }
            }


        });
    };
})();