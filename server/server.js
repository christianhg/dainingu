(function () {
    'use strict';

    var bodyParser = require('body-parser');
    var express = require('express');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');

    var app = express();
    var routes = require('./routes');
    var server = app.listen(2000);
    var io = require('socket.io').listen(server);

    //module.exports = server;

    // Bootstrap MongoDB connection
    mongoose.connect('mongodb://localhost/dainingu');

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

    routes(app, io);
})();