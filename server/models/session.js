(function () {
    'use strict';

    var mongoose = require('mongoose');
    var bcrypt = require('bcrypt');
    var randToken = require('rand-token');

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

    sessionSchema.pre('save', function(next) {
        var session = this;

        session.key = randToken.generate(6, 'ABCDEFGHJKMNPQRSTUVWXYZ23456789');

        next();
    });

})();