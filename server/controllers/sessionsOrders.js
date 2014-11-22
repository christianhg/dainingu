(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');

    exports.store = function(req, res, callback) {
        var sessionId = req.params.id;

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

    };

})();