(function () {
    'use strict';

    var bcrypt = require('bcrypt');
    var mongoose = require('mongoose');

    var userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        password: String,
        access: {
            group: String,
            level: Number
        }
    });

    /*,
     profile: {
     email: {
     type: String,
     unique: true,
     lowercase: true
     },
     name: {
     type: String,
     default: ''
     },
     phone: {
     type: Number,
     default: ''
     },
     picture: {
     type: String,
     default: ''
     }
     }*/

    /**
     * Hash password before creating user.
     */
    userSchema.pre('save', function(next) {
        var user = this;

        if(!user.isModified('password')) {
            return next();
        }

        bcrypt.genSalt(5, function(err, salt) {
            if(err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }

                user.password = hash;

                next();
            });
        });


    });

    /**
     * Validate user's password.
     * @param candidatePassword
     * @param callback
     */
    userSchema.methods.comparePassword = function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if(err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    };

    var User = mongoose.model('User', userSchema, 'users');

    // Expose model
    module.exports = User;
})();