(function () {
    'use strict';

    var mongoose = require('mongoose');

    var menuSchema = new mongoose.Schema({
        title: {
            type: String
        }
    });

    var Menu = mongoose.model('Menu', menuSchema, 'menus');

    // expose model
    module.exports = Menu;
})();