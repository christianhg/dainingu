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
     * Start Express server and have socket.io listen to the server.
     */
    var server = app.listen(appConfig.port);
    var io = socketIo.listen(server);

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
    sequelize.setup(__dirname + '/models/sequelize',
        dbConfig.mysql.database,
        dbConfig.mysql.user,
        dbConfig.mysql.password,
        {
            host: dbConfig.mysql.host
        });

    /**
     * Express configuration.
     */
    // set static dir.
    app.use(express.static(__dirname + '/../client/build'));
    // Get data from html forms.
    app.use(bodyParser.json());
    // Faux http method support.
    app.use(methodOverride());
    // Log requests in console.
    app.use(morgan('dev'));

    io.on('connection', function(socket) {
        console.log('connection established');
        socket.emit('connected');
    }).on('disconnect', function() {
        console.log('connection closed');
    });

    /**
     * Bootstrap routes and inject our app and WebSocket.
     */
    routes(app, io);
})();