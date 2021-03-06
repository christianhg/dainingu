(function () {
    'use strict';

    var Session = require('../models/mongoose/session');

    /**
     * Delete session.
     */
    exports.destroy = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(session) {
                session.remove(function(err) {
                    if(err) {
                        res.send(err);
                    }

                    var data = {
                        message: 'Session med nøglen ' + session.key + ' er slettet',
                        session: session
                    };

                    res.json(data);

                    callback(data);
                });
            }
        });
    };

    /**
     * Get all sessions.
     */
    exports.index = function(req, res, callback) {
        Session.find(function(err, sessions) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Sessioner vist',
                sessions: sessions
            };

            res.json(sessions);

            callback(data);
        });
    };

    /**
     * Get specific session.
     */
    exports.show = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Session vist',
                session: session
            };

            res.json(session);

            callback(data);
        });
    };

    /**
     * Add new session.
     */
    exports.store = function(req, res, callback) {
        var session = new Session();

        session.key = '';

        if(req.body.customer) {
            session.customer.name = req.body.customer.name;
        }
        if(req.body.table) {
            session.table = req.body.table;
        }

        session.save(function(err) {
            if(err) {
                res.send(err);
            }

            var data = {
                message: 'Session med nøglen ' + session.key + ' er tilføjet',
                session: session
            };

            res.json(data);

            callback(data);
        });
    };

    /**
     * Update session.
     */
    exports.update = function(req, res, callback) {
        Session.findById(req.params.id, function(err, session) {
            if(err) {
                res.send(err);
            }

            session.table = req.body.table;
            session.customer.name = req.body.customer.name;

            session.save(function(err) {
                if(err) {
                    res.send(err);
                }

                var data = {
                    message: 'Session med nøglen ' + session.key + ' er opdateret',
                    session: session
                };

                res.json(data);

                callback(data);
            });
        });
    };

    /**
     * Activate session.
     */
    exports.activate = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findById(sessionId, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.activate(function(active) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Session med nøglen ' + session.key + ' er aktiveret',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Deactivate session.
     */
    exports.deactivate = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findById(sessionId, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.deactivate(function(active) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Session med nøglen ' + session.key + ' er deaktiveret',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Expire session.
     */
    exports.expire = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findById(sessionId, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.expire(function(expired) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Session med nøglen ' + session.key + ' er udløbet',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Resume session.
     */
    exports.resume = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findById(sessionId, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.resume(function(expired) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Session med nøglen ' + session.key + ' er gentaget',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

})();