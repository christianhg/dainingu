(function () {
    'use strict';

    var mongoose = require('mongoose');

    var menuSchema = new mongoose.Schema({
        name: {
            type: String
        },
        dishes: [{
            title: String,
            price: Number
        }]
    });

    var Menu = mongoose.model('Menu', menuSchema, 'menus');

    // expose model
    module.exports = Menu;
})();