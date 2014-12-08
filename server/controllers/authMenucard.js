(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/mongoose/session');

    /**
     * Activate session using session key.
     */
    exports.activate = function(req, res, callback) {
        var candidateKey = req.body.key;

        Session.findOne({ key: candidateKey }, function(err, session) {
            if(err) {
                res.send(err);
            }

            // Session doesn't exist
            if(!session) {
                var data = {
                    message: 'Session activation failed.'
                };

                res.json(data);

                return callback(data);
            } else {
                session.status(function(isActive, isExpired) {
                    if(isExpired) {
                        var data = {
                            message: 'Session activation failed.',
                            session: session._id
                        };

                        res.json(data);

                        return callback(data);
                    } else {
                        // Activate session.
                        session.activate(function(activated) {
                            if(activated) {
                                session.save();
                            }
                        });

                        var token = jwt.sign(session._id, secrets.jwtSecrets.authMenucard, { expiresInMinutes: 60*5 });

                        var data = {
                            message: 'Session activation successful.',
                            session: session._id,
                            success: true,
                            token: token
                        };

                        res.json(data);

                        return callback(data);
                    }
                })
            }
        });
    };

    /**
     * Get session id.
     */
    exports.getSessionId = function(req, res, callback) {
        var menucardToken = req.body.token;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {

            Session.findOne({ _id: sessionId }, function(err, session) {
                if(err) {
                    res.send(err);
                }

                if(!session) {
                    res.send(false);
                } else {
                    res.send(sessionId);

                }
            });
        });
    };

    /**
     * Validate menucard token.
     */
    exports.validate = function(req, res, callback) {
        var menucardToken = req.body.token;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {

            Session.findOne({ _id: sessionId }, function(err, session) {
                if(err) {
                    res.send(err);
                }

                if(!session) {
                    res.send(false);
                } else {
                    session.status(function(isActive, isExpired) {
                        if(!isActive || isExpired) {
                            res.send(false);
                        } else {
                            res.send(true);
                        }
                    });
                }
            });
        })
    }

})();