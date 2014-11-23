(function () {
    'use strict';

    var bcrypt = require('bcrypt');
    var mongoose = require('mongoose');
    var randToken = require('rand-token');

    var sessionSchema = new mongoose.Schema({
        active: {
            type: Boolean,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        expired: {
            type: Boolean,
            default: false
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
        orders: [{
            createdOn: {
                type: Date,
                default: Date.now
            },
            finished: {
                type: Boolean,
                default: false
            },
            confirmed: {
                type: Boolean,
                default: false
            },
            done: {
                type: Boolean,
                default: false
            },
            dishes: [{
                id: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }]
        }]
    });

    sessionSchema.pre('save', function(next) {
        var session = this;

        if(!session.isModified('key')) {
            return next();
        } else {
            session.key = randToken.generate(6, 'ABCDEFGHJKMNPQRSTUVWXYZ23456789');
        }

        next();
    });

    sessionSchema.methods.findOrder = function(orderId, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];
                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order);
        }

    };

    sessionSchema.methods.addOrder = function(callback) {
        this.orders.push({});
        callback(this.orders);
    };

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

    sessionSchema.methods.addDish = function(orderId, dish, callback) {
        var order;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {
                order = this.orders[i];

                this.orders[i].dishes.push(dish);

                break;
            }
        }

        if(!order) {
            callback(false);
        } else {
            callback(order.dishes);
        }
    };

    sessionSchema.methods.removeDish = function(orderId, dishId, callback) {
        var dishes;

        for(var i = 0; i < this.orders.length; i++) {
            if(this.orders[i]._id == orderId) {

                for(var j = 0; j < this.orders[i].dishes.length; j++) {
                    if(this.orders[i].dishes[j]._id == dishId) {
                        this.orders[i].dishes.splice(j, 1);

                        dishes = this.orders[i].dishes;

                        break;
                    }
                }
            }
        }

        if(!dishes) {
            callback(false);
        } else {
            callback(dishes);
        }
    };

    sessionSchema.methods.status = function(callback) {
        callback(this.active, this.expired);
    };

    sessionSchema.methods.activate = function(callback) {
        this.active = true;
        callback(this.active);
    };

    sessionSchema.methods.deactivate = function(callback) {
        this.active = false;
        callback(this.active);
    };

    sessionSchema.methods.expire = function(callback) {
        this.expired = true;
        callback(this.expired);
    };

    var Session = mongoose.model('Session', sessionSchema);

    module.exports = Session;
})();