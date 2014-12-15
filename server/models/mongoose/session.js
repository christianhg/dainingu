(function () {
    'use strict';

    var bcrypt = require('bcrypt');
    var mongoose = require('mongoose');
    var randToken = require('rand-token');

    var dishSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    });

    var orderSchema = new mongoose.Schema({
        createdOn: {
            type: Date,
            default: Date.now
        },
        pristine: {
            type: Boolean,
            default: true
        },
        committed: {
            type: Boolean,
            default: false
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        begun: {
            type: Boolean,
            default: false
        },
        completed: {
            type: Boolean,
            default: false
        },
        served: {
            type: Boolean,
            default: false
        },
        closed: {
            type: Boolean,
            default: false
        },
        dishes: [dishSchema]
    });

    var sessionSchema = new mongoose.Schema({
        active: {
            type: Boolean,
            default: false
        },
        expired: {
            type: Boolean,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        key: {
            type: String,
            unique: true
        },
        customer: {
            name: {
                type: String
            }
        },
        table: {
            type: String
        },
        orders: [orderSchema]
    });

    var Session = mongoose.model('Session', sessionSchema);

    // Expose model
    module.exports = Session;

    /**
     * Generate random session key before session creation.
     * TODO: The function needs to check if the key is unique.
     */
    sessionSchema.pre('save', function(next) {
        var session = this;

        if(!session.isModified('key')) {
            return next();
        } else {
            session.key = randToken.generate(6, 'ABCDEFGHJKMNPQRSTUVWXYZ23456789');
        }

        next();
    });

    /**
     * Get status of session.
     */
    sessionSchema.methods.status = function(callback) {
        callback(this.active, this.expired);
    };

    /**
     * Activate session.
     */
    sessionSchema.methods.activate = function(callback) {
        this.active = true;
        callback(this.active);
    };

    /**
     * Deactivate session.
     */
    sessionSchema.methods.deactivate = function(callback) {
        this.active = false;
        callback(this.active);
    };

    /**
     * Expire session.
     */
    sessionSchema.methods.expire = function(callback) {
        this.expired = true;
        this.active = false;
        callback(this.expired);
    };

    /**
     * Resume session.
     */
    sessionSchema.methods.resume = function(callback) {
        this.expired = false;
        callback(this.expired);
    };

    /**
     * Find specific order by order id.
     * Return the order and it's array index.
     * @param orders
     * @param orderId
     * @param callback
     */
    var findOrder = function(orders, orderId, callback) {
        var order = false;
        var index = false;

        for(var i = 0; i < orders.length; i++) {
            if(orders[i]._id == orderId) {
                order = orders[i];
                index = i;
                break;
            }
        }

        callback(order, index);
    };

    /**
     * Find specific order in session.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.findOrder = function(orderId, callback) {
        findOrder(this.orders, orderId, function(order) {
            callback(order);
        });
    };

    /**
     * Remove specific order in session.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.removeOrder = function(orderId, callback) {
        var orders;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                this.orders.splice(i, 1);
                orders = this.orders;
                break;
            }
        }

        if(!orders) {
            callback(false);
        } else {
            callback(orders);
        }
    };

    /**
     * Add new order to session.
     * @param callback
     */
    sessionSchema.methods.addOrder = function(callback) {
        this.orders.push({});
        var order = this.orders[this.orders.length-1];
        callback(order);
    };

    /**
     * Find specific dish in specific order in session.
     * TODO: Rewrite to find order and dishes using aggregation operations.
     * @param orderId
     * @param dishId
     * @param callback
     */
    sessionSchema.methods.findDish = function(orderId, dishId, callback) {
        var dish;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {

                for(var j = 0; j < this.orders[i].dishes.length; j++) {
                    if(this.orders[i].dishes[j]._id == dishId) {
                        dish = this.orders[i].dishes[j];

                        break;
                    }
                }
            }
        }

        if(!dish) {
            callback(false);
        } else {
            callback(dish);
        }
    };

    /**
     * Find all dishes in specific order in session.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.findDishes = function(orderId, callback) {
        var dishes;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                dishes = this.orders[i].dishes;

                break;
            }
        }

        if(!dishes) {
            callback(false);
        } else {
            callback(dishes);
        }
    };

    /**
     * Add dish to specific order in session.
     * @param orderId
     * @param dish
     * @param callback
     */
    sessionSchema.methods.addDish = function(orderId, dish, callback) {
        var orders = this.orders;

        findOrder(orders, orderId, function(order, index) {
            if(order) {
                orders[index].dishes.push(dish);
                callback(dish);
            } else {
                callback(false);
            }
        });

        this.orders = orders;
    };

    /**
     * Remove dish from specific order in session.
     * TODO: Rewrite to find order and dishes using aggregation operations.
     * @param orderId
     * @param dishId
     * @param callback
     */
    sessionSchema.methods.removeDish = function(orderId, dishId, callback) {
        var dish;

        console.log(orderId, dishId);

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                for(var j = 0; j < this.orders[i].dishes.length; j++) {
                    if(this.orders[i].dishes[j]._id == dishId) {
                        dish = this.orders[i].dishes[j];
                        this.orders[i].dishes.splice(j, 1);

                        break;
                    }
                }
            }
        }

        if(!dish) {
            callback(false);
        } else {
            callback(dish);
        }
    };

    /**
     * Mark specific order in session as committed.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.commitOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].pristine = false;
                this.orders[i].committed = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as pulled.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.pullOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].pristine = true;
                this.orders[i].committed = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as confirmed.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.confirmOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].committed = false;
                this.orders[i].confirmed = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as rejected.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.rejectOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].committed = true;
                this.orders[i].confirmed = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as begun.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.beginOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].confirmed = false;
                this.orders[i].begun = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as stopped.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.stopOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].confirmed = true;
                this.orders[i].begun = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };


    /**
     * Mark specific order in session as completed.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.completeOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].begun = false;
                this.orders[i].completed = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as incompleted.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.incompleteOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].begun = true;
                this.orders[i].completed = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as served.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.serveOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].completed = false;
                this.orders[i].served = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as returned.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.returnOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].completed = true;
                this.orders[i].served = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as closed.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.closeOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].served = false;
                this.orders[i].closed = true;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };

    /**
     * Mark specific order in session as opened.
     * TODO: Rewrite to find order using aggregation operations.
     * @param orderId
     * @param callback
     */
    sessionSchema.methods.openOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].served = true;
                this.orders[i].closed = false;

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }
    };
})();