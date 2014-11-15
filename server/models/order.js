(function () {
    'use strict';
    var mongoose = require('mongoose');

    var orderSchema = new mongoose.Schema({

    });

    var Order = mongoose.model('Order', orderSchema);

    module.exports = Order;
})();