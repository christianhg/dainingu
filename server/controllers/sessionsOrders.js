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

    /**
     * Commit order.
     */
    exports.commit = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.commitOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order committed',
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
     * Pull order.
     */
    exports.pull = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.pullOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order pulled',
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
     * Confirm order.
     */
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

    /**
     * Reject order.
     */
    exports.reject = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.rejectOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order rejected',
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
     * Complete order.
     */
    exports.complete = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.completeOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order completed',
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
     * Incomplete order.
     */
    exports.incomplete = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.incompleteOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order incompleted',
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
     * Close order.
     */
    exports.close = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.closeOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order closed',
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
     * Open order.
     */
    exports.open = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.openOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Order opened',
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