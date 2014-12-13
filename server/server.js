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
    var socketIo = require('socket.io');
    var sequelize = require('./config/sequelize');
    var appConfig = require('./config/app');
    var dbConfig = require('./config/db');

    /**
     * Create Express server.
     */
    var app = express();
    var routes = require('./routes');

    /**
     * Start Express server.
     */
    var server = app.listen(appConfig.port);

    /**
     * Setup WebSocket.
     */
    var io = socketIo.listen(server);

    io.on('connection', function(socket) {
        console.log('user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    /**
     * Connect to MongoDB.
     */
    mongoose.connect('mongodb://' +
        dbConfig.mongodb.user + ':' +
        dbConfig.mongodb.password + '@' +
        dbConfig.mongodb.host + '/' +
        dbConfig.mongodb.database);

    /**
     * Connect to MySQL and wire up Sequelize models.
     */
    sequelize.connect(
        dbConfig.mysql.user,
        dbConfig.mysql.password,
        dbConfig.mysql.host,
        dbConfig.mysql.database);

    /**
     * Express configuration.
     */
    // Disable cache on all API responses.
    app.get('/api/*', function(req, res, next) {
        res.set({'Cache-Control': 'no-cache'});
        next();
    });
    // set static dir.
    app.use(express.static(__dirname + '/../client/build'));
    // Get data from html forms.
    app.use(bodyParser.json());
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));

    /**
     * Bootstrap routes and inject our app and WebSocket.
     */
    routes(app, io);
})();