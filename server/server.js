(function () {
    'use strict';

    /**
     * Module dependencies.
     */
    var bodyParser = require('body-parser');
    //var cookieParser = require('cookie-parser');
    var express = require('express');
    var expressJwt = require('express-jwt');
    //var flash = require('connect-flash');
    var jwt = require('jsonwebtoken');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');
    //var passport = require('passport');
    //var session = require('express-session');
    var socketIo = require('socket.io');
    var socketioJwt = require('socketio-jwt');
    var secrets = require('./config/secrets');

    /**
     * Create Express server.
     */
    var app = express();
    var routes = require('./routes');

    /**
     * Start Express server.
     */
    var server = app.listen(secrets.port);
    var io = socketIo.listen(server);

    /**
     * Connect to MongoDB.
     */
    mongoose.connect(secrets.mongodb);

    // configure passport object
    //require('./config/passport')(passport);

    /**
     * Express configuration.
     */
    app.use(express.static(__dirname + '/../client/build'));
    // Protect /api/users with JWT
    app.use('/api/users', expressJwt({secret: secrets.jwt_secret}));
    // Protect /api/sessions with JWT
    app.use('/api/sessions', expressJwt({secret: secrets.jwt_secret}));
    // Get data from html forms.
    app.use(bodyParser.json());
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));

    io.use(socketioJwt.authorize({
        secret: secrets.jwt_secret,
        handshake: true
    }));

    io.on('connection', function(socket) {
        console.log(socket.decoded_token.username, 'connected');
    }).on('disconnect', function() {
        console.log('disconnected');
    });

    /**
     * Routes.
     */
    routes(app, io);
})();