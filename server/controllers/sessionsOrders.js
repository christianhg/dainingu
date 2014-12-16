(function () {
    'use strict';

    var Session = require('../models/mongoose/session');

    /**
     * Delete specific order in specific session.
     */
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
                            message: 'Ordre fra sessionen med nøglen ' + session.key + ' er slettet',
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
                var data = {
                    message: 'Ordrer fra sessionen med nøglen ' + session.key + ' vist',
                    orders: session.orders
                };

                res.json(session.orders);

                callback(data);
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
                    var data = {
                        message: 'Ordre fra sessionen med nøglen ' + session.key + ' vist',
                        order: order
                    };

                    res.json(order);

                    callback(data);
                });
            }
        });
    };

    /**
     * Add order to specific session.
     */
    exports.store = function(req, res, callback) {
        var sessionId = req.params.sessionId;

        Session.findOne({ _id: sessionId }, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.addOrder(function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Ordre tilføjet til sessionen med nøglen ' + session.key,
                            order: order
                        };

                        res.json(data);

                        callback(data);
                    });

                });
            }
        });

    };

    /**
     * Commit order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev indsendt',
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
     * Pull order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev indsendt tilbage',
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
     * Confirm order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev konfirmeret',
                            order: order
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Reject order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev afvist',
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
     * Begin order in specific session.
     */
    exports.begin = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.beginOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev begyndt',
                            order: order
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Stop order in specific session.
     */
    exports.stop = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.stopOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev stoppet',
                            order: order
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Complete order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev færdiggjort',
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
     * Incomplete order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev ufærdiggjort',
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
     * Serve order in specific session.
     */
    exports.serve = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.serveOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev serveret',
                            order: order
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            }
        });
    };

    /**
     * Return order in specific session.
     */
    exports.return = function(req, res, callback) {
        var sessionId = req.params.sessionId;
        var orderId = req.params.orderId;

        Session.findOne({_id: sessionId}, function(err, session) {
            if(err) {
                res.send(err);
            }

            if(!session) {
                res.send(false);
            } else {
                session.returnOrder(orderId, function(order) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev returneret',
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
     * Close order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev lukket',
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
     * Open order in specific session.
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
                            message: 'Ordre (' + session.key + ':' + order.createdOn + ') blev åbnet',
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