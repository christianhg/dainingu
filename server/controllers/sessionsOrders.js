(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');

    exports.index = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                res.send(session.orders);
            }
        });
    };

    exports.show = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            var orders = session.orders;
            var order;

            for(var i = 0; i < orders.length; i++) {
                if(orders[i]._id == orderId) {
                    order = orders[i];
                    break;
                }
            }

            if(!order) {
                res.send(false);
            } else {
                res.send(order);
            }

        });
    };

    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.addOrder(function(orders) {
                    session.save();
                    res.send(session);
                });


                    /*session.save();

                        var data = {
                            message: 'Order added to session',
                            session: session
                        };

                        res.json(data);

                        callback(data);
*/


                /*var order = new Order();

                session.orders.push(order);

                session.save(function(err) {
                    if(err) {
                        res.send(err);
                    }

                    var data = {
                        message: 'Order added to session',
                        session: session
                    };

                    res.json(data);

                    callback(data);
                });
*/
            }
        });

    };

})();