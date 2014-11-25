(function () {
    'use strict';

    module.exports = function(app, io) {

        var expressJwt = require('express-jwt');
        var jwt = require('jsonwebtoken');
        var secrets = require('./config/secrets');

        var jwtCheck = expressJwt({
            secret: secrets.jwt_secret
        });

        /**
         * Authentication routes.
         */
        require('./routes/auth')(app, io, jwtCheck);

        /**
         * Users API routes.
         */
        require('./routes/users')(app, io, jwtCheck);

        /**
         * Menus API routes.
         */
        require('./routes/menus')(app, io, jwtCheck);

        /**
         * Menus Dishes API routes.
         */
        require('./routes/menusDishes')(app, io, jwtCheck);

        /**
         * Dishes API routes.
         */
        require('./routes/dishes')(app, io, jwtCheck);

        /**
         * Sessions API routes.
         */
        require('./routes/sessions')(app, io, jwtCheck);

        /**
         * SessionsOrders API routes.
         */
        require('./routes/sessionsOrders')(app, io, jwtCheck);

        /**
         * SessionsOrdersDishes API routes.
         */
        require('./routes/sessionsOrdersDishes')(app, io, jwtCheck);

    };
})();