(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/session');

    /**
     * Find all orders in specific session
     */
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

    /**
     * Find specific order in specific session
     */
    exports.show = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.findOrder(orderId, function(order) {
                    res.send(order);
                });
            }
        });
    };

    exports.destroy = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.removeOrder(orderId, function(orders) {
                    session.save(function(err) {
                        if(err) {
                           res.send(err);
                        }

                        var data = {
                            message: 'Order deleted',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.finish = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.finishOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order finished',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.unFinish = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.unFinishOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order unfinished',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.confirm = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.confirmOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order confirmed',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.unConfirm = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.unConfirmOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order unconfirmed',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.done = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.doneOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order done',
                            session: session
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    exports.unDone = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.unDoneOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order undone',
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
        var sessionId = req.params.sessionId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.addOrder(function(orders) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order added to session',
                            session: session
                        };

                        res.json(session);

                        callback(data);
                    });

                });
            }
        });

    };

})();