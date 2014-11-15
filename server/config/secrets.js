(function () {
    'use strict';

    module.exports = {

        mongodb: process.env.MONGODB || 'mongodb://localhost:/dainingu',

        port: process.env.Port || 2000,

        /**
         * Session secret to prevent tampering.
         */
        sessionSecret : "mongooseontheloose"
    };

})();