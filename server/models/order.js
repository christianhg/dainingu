(function () {
    'use strict';
    var mongoose = require('mongoose');

    var orderSchema = new mongoose.Schema({
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
    });

    var Order = mongoose.model('Order', orderSchema);

    module.exports = Order;
})();