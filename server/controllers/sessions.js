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

            res.json(sessions);

            var data = {
                message: 'Sessions shown',
                sessions: sessions
            };

            callback(data);
        });
    };

    exports.update = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(err) {
                res.send(err);
            }

            // Update data
            session.title = req.body.title;

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

            res.json(session);

            var data = {
                message: 'Session shown',
                session: session
            };

            callback(data);
        });
    };

    exports.store = function(req, res, callback) {
        var session = new Menu();

        session.title = req.body.title;

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