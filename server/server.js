(function () {
    'use strict';

    /**
     * Module dependencies.
     */
    var bodyParser = require('body-parser');
    var express = require('express');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');

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
    var io = require('socket.io').listen(server);

    /**
     * Connect to MongoDB.
     */
    mongoose.connect(secrets.mongodb);

    /**
     * Express configuration.
     */
    app.use(express.static(__dirname + '/../client/build'));

    // Get data from html forms.
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));

    io.sockets.on('connection', function (socket) {
        socket.emit('handshake', {data: 'hello client'});
    });

    /**
     * Routes.
     */
    routes(app, io);
})();