(function () {
    'use strict';

    var Session = require('../models/session');

    exports.destroy = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
           session.remove(function(err) {
               if(err) {
                   res.send(err);
               }

               var data = {
                   message: 'Session deleted',
                   session: session
               };

               res.json(data);

               callback(data);
            });
        });
    };

    exports.index = function(req, res, callback) {
        Session.find(function(err, sessions) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Sessions shown',
                sessions: sessions
            };

            res.json(sessions);

            callback(data);
        });
    };

    exports.update = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(err) {
                res.send(err);
            }

            // Update data
            session.active = req.body.active;
            session.expired = req.body.expired;

            session.save(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'Session updated',
                    session: session
                };

                res.json(data);

                callback(data);
            });
        });
    };

    exports.show = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Session shown',
                session: session
            };

            res.json(session);

            callback(data);
        });
    };

    exports.store = function(req, res, callback) {
        var session = new Session();

        session.customer.name = req.body.customer.name;
        session.table = req.body.table;

        session.save(function (err) {
            if (err) {
                res.send(err);
            }

            var data = {
                message: 'Session added',
                session: session
            };

            res.json(data);

            callback(data);
        });
    };

})();