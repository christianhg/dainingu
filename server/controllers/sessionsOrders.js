(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');
    var Order = require('../models/order');

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

    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                var order = new Order();

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

            }
        });

    };

})();