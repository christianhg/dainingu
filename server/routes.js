(function () {
    'use strict';

    /**
     * Routes module.
     * @param app
     * @param io
     */
    module.exports = function(app, io) {

        var expressJwt = require('express-jwt');
        var jwt = require('jsonwebtoken');
        var secrets = require('./config/secrets');

        var jwtCheck = expressJwt({
            secret: secrets.jwt_secret
        });

        /**
         * Authentication routes.
         *
         */
        require('./routes/auth')(app, io, jwtCheck);

        /**
         * Users API routes.
         * Routes for reading, adding, updating and deleting users.
         */
        require('./routes/users')(app, io, jwtCheck);

        /**
         * Menus API routes.
         * Routes for reading, adding, updating and deleting menus.
         */
        require('./routes/menus')(app, io, jwtCheck);

        /**
         * Menus Dishes API routes.
         * Routes for reading, adding, updating and deleting
         * dishes from menus.
         */
        require('./routes/menusDishes')(app, io, jwtCheck);

        /**
         * Dishes API routes.
         * Routes for reading, adding, updating and deleting dishes.
         * Additional routes to activate/deactivate dishes.
         */
        require('./routes/dishes')(app, io, jwtCheck);

        /**
         * Sessions API routes.
         * Routes for reading, adding, updating and deleting sessions.
         * Additional routes to activate/deactivate
         * and expire/resume sessions.
         */
        require('./routes/sessions')(app, io, jwtCheck);

        /**
         * SessionsOrders API routes.
         * Routes for reading, adding and deleting orders som sessions.
         * Additional routes to commit/pull, confirm/reject,
         * complete/incomplete and close/open orders.
         */
        require('./routes/sessionsOrders')(app, io, jwtCheck);

        /**
         * SessionsOrdersDishes API routes.
         * Routes for reading, adding and deleting dishes from orders.
         */
        require('./routes/sessionsOrdersDishes')(app, io, jwtCheck);

    };
})();