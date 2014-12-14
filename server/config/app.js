(function () {
    'use strict';

    module.exports = {
        /**
         * Port.
         */
        port: process.env.Port || 2000,
        /**
         * Static dir.
         */
        staticDir: '/../client/build'
    };
})();