(function () {
    'use strict';

    var mongoose = require('mongoose');

    var sessionSchema = new mongoose.Schema({
        active: {
            type: Boolean
        },
        createdOn: {
            type: Date
        },
        expired: {
            type: String
        },
        key: {
            type: String
        },
        customer: {
            name: {
                type: String
            }
        },
        table: {
            type: String
        }
    });

    var Session = mongoose.model('Session', sessionSchema);

    module.exports = Session;
})();