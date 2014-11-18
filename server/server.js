(function () {
    'use strict';

    /**
     * Module dependencies.
     */
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var express = require('express');
    var expressJwt = require('express-jwt');
    var flash = require('connect-flash');
    var jwt = require('jsonwebtoken');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');
    var passport = require('passport');
    var session = require('express-session');
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
    require('./config/passport')(passport);

    /**
     * Express configuration.
     */
    app.use(express.static(__dirname + '/../client/build'));

    // We are going to protect /api routes with JWT
    app.use('/api', expressJwt({secret: secrets.jwt_secret}));
    // Get data from html forms.
    app.use(bodyParser.json());
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));
    // cookie middleware must be used before session middleware
    app.use(cookieParser());
    // session middleware
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: secrets.sessionSecret
    }));
    // authentication middleware
    app.use(passport.initialize());
    // login sessions
    app.use(passport.session());
    // store and retrieve messages from session
    app.use(flash());

    io.set('authorization', socketioJwt.authorize({
        secret: secrets.jwt_secret,
        handshake: true
    }));

    io.sockets
        .on('connection', function(socket) {
            console.log(socket.client.request.decoded_token.username, 'connected');
            socket.on('ping', function(m) {
                socket.emit('pong', m);
            });
        });

    /*io.sockets.on('connection', function (socket) {
     socket.emit('handshake', {data: 'hello client'});
     });*/

    /**
     * Routes.
     */
    routes(app, io, passport);
})();