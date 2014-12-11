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

        var jwtAuth = expressJwt({
            secret: secrets.jwtSecrets.auth
        });

        var jwtAuthMenucard = expressJwt({
            secret: secrets.jwtSecrets.authMenucard
        });

        /**
         * Authentication routes.
         * Routes for signin and validation of login token.
         */
        require('./routes/auth')(app, io, jwtAuth);

        /**
         * Menucard authentication routes.
         * Routes for activating and validation of menucard token.
         */
        require('./routes/authMenucard')(app, io, jwtAuthMenucard);

        /**
         * Menucard API routes.
         *
         */
        require('./routes/menucard')(app, io, jwtAuthMenucard);

        /**
         * Users API routes.
         * Routes for reading, adding, updating and deleting users.
         */
        require('./routes/users')(app, io, jwtAuth);

        /**
         * Menus API routes.
         * Routes for reading, adding, updating and deleting menus.
         */
        require('./routes/menus')(app, io, jwtAuth);

        /**
         * Menus Dishes API routes.
         * Routes for reading, adding, updating and deleting
         * dishes from menus.
         */
        require('./routes/menusDishes')(app, io, jwtAuth);

        /**
         * Dishes API routes.
         * Routes for reading, adding, updating and deleting dishes.
         * Additional routes to activate/deactivate dishes.
         */
        require('./routes/dishes')(app, io, jwtAuth);

        /**
         * Sessions API routes.
         * Routes for reading, adding, updating and deleting sessions.
         * Additional routes to activate/deactivate
         * and expire/resume sessions.
         */
        require('./routes/sessions')(app, io, jwtAuth);

        /**
         * SessionsOrders API routes.
         * Routes for reading, adding and deleting orders som sessions.
         * Additional routes to commit/pull, confirm/reject,
         * complete/incomplete and close/open orders.
         */
        require('./routes/sessionsOrders')(app, io, jwtAuth);

        /**
         * SessionsOrdersDishes API routes.
         * Routes for reading, adding and deleting dishes from orders.
         */
        require('./routes/sessionsOrdersDishes')(app, io, jwtAuth);

        /**
         * Orders API routes.
         * Routes for reading orders.
         */
        require('./routes/orders')(app, io, jwtAuth);
    };
})();