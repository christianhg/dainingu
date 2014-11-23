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

            session.table = req.body.table;
            session.customer.name = req.body.customer.name;

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
                            message: 'Session activated',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

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
                            message: 'Session deactivated',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

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
                            message: 'Session expired',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

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
                            message: 'Session resumed',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

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
                message: 'Session added',
                session: session
            };

            res.json(data);

            callback(data);
        });
    };

})();