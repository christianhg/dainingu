(function () {
    'use strict';

    var jwt = require('jsonwebtoken');
    var secrets = require('../config/secrets');
    var Session = require('../models/mongoose/session');


    /**
     * Get orders.
     */
    exports.orders = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {

            Session.findOne({ _id: sessionId }, function(err, session) {
                if(err) {
                    res.send(err);
                }

                if(!session) {
                    res.send(false);
                } else {
                    var data = {
                        message: 'Orders shown',
                        orders: session.orders
                    };

                    res.json(session.orders);

                    callback(data);
                }
            });

        });
    };

    /**
     * Add new order.
     */
    exports.addOrder = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {

            Session.findOne({_id: sessionId}, function (err, session) {
                if(err) {
                    res.send(err);
                }

                if (!session) {
                    res.send(false);
                } else {
                    session.addOrder(function (order) {
                        session.save(function (err) {
                            if (err) {
                                res.send(err);
                            }

                            var data = {
                                message: 'Order added to session',
                                order: order
                            };

                            res.json(data);

                            callback(data);
                        });

                    });
                }
            });
        });
    };

    /**
     * Add dish to order.
     * @param req
     * @param res
     * @param callback
     */
    exports.addDishToOrder = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);
        var orderId = req.body.orderId;
        var dish = req.body.dish;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {
            Session.findOne({ _id: sessionId }, function(err, session) {

                session.addDish(orderId, dish, function(dish) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Dish saved',
                            dish: dish
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            });
        });
    };

    /**
     * Remove dish from order.
     * @param req
     * @param res
     * @param callback
     */
    exports.removeDishFromOrder = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);
        var orderId = req.body.orderId;
        var dishId = req.body.dishId;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {
            Session.findOne({ _id: sessionId }, function(err, session) {
                session.removeDish(orderId, dishId, function(dish) {
                    session.save(function(err) {
                        if(err) {
                            res.send(err);
                        }

                        var data = {
                            message: 'Dish removed',
                            dish: dish
                        };

                        res.json(data);

                        callback(data);
                    });
                });
            });
        });
    };


    /**
     * Commit order.
     */
    exports.commitOrder = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);
        var orderId = req.body.orderId;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {
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
                                order: order
                            };

                            res.json(data);

                            callback(data);
                        });
                    });
                }
            });
        });
    };

    /**
     * Return order.
     */
    exports.returnOrder = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);
        var orderId = req.body.orderId;

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {
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
                                message: 'Order returned',
                                order: order
                            };

                            res.json(data);

                            callback(data);
                        });
                    });
                }
            });
        });
    };

    /**
     * Get session.
     */
    exports.getSession = function(req, res, callback) {
        var authorization = req.headers.authorization;
        var menucardToken = authorization.substring(7, authorization.length);

        jwt.verify(menucardToken, secrets.jwtSecrets.authMenucard, function(err, sessionId) {

            if(err) {
                res.send(err);
            } else {
                Session.findOne({ _id: sessionId }, function(err, session) {
                    if(err) {
                        res.send(err);
                    }

                    if(!session) {
                        res.send(false);
                    } else {
                        res.send(session);

                    }
                });
            }


        });
    };
})();