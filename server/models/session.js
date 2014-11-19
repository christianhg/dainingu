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



    sessionSchema.pre('save', function(next) {
        var session = this;

        if(!session.isModified('key')) {
            return next();
        } else {
            session.key = randToken.generate(6, 'ABCDEFGHJKMNPQRSTUVWXYZ23456789');
        }

        next();
    });

    sessionSchema.methods.status = function(callback) {
        callback(this.active, this.expired);
    };

    sessionSchema.methods.activate = function(callback) {
        this.active = true;
        callback(this.active);
    };


    var Session = mongoose.model('Session', sessionSchema);

    module.exports = Session;
})();