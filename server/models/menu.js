(function () {
    'use strict';

    var mongoose = require('mongoose');

    var menuSchema = new mongoose.Schema({
        name: {
            type: String
        },
        dishes: [{
            name: String,
            price: Number
        }]
    });

    var Menu = mongoose.model('Menu', menuSchema, 'menus');

    module.exports = Menu;
})();