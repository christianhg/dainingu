(function () {
    'use strict';

    /**
     * Module dependencies.
     */
    var bodyParser = require('body-parser');
    var express = require('express');
    var expressJwt = require('express-jwt');
    var jwt = require('jsonwebtoken');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');
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

    /**
     * Connect to MySQL and wire up our models.
     */
    require("./config/sequelize").setup(__dirname + '/models/sequelize', "dainingu", "root", null, {
        host: 'localhost'
    });

    /**
     * Express configuration.
     */
    app.use(express.static(__dirname + '/../client/build'));
    // Get data from html forms.
    app.use(bodyParser.json());
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));

    /*io.use(socketioJwt.authorize({
        secret: secrets.jwt_secret,
        handshake: true
    }));*/

    io.on('connection', function(socket) {
        //console.log(socket.decoded_token, 'connected');
        console.log('connection established');
        socket.emit('connected')
    }).on('disconnect', function() {
        console.log('disconnected');
    });

    /**
     * Routes.
     */
    routes(app, io);
})();