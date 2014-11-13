(function () {
    'use strict';

    var express = require('express');
    var http = require('http');
    var mongoose = require('mongoose');
    var morgan = require('morgan');

    var app = express();
    var server = app.listen(2000);
    var io = require('socket.io').listen(server);

    mongoose.connect('mongodb://localhost/dainingu');


    require('./routes')(app);

    app.route('/')
        .get(function(req, res) {
            res.sendFile(__dirname + '/index.html');
        });

    app.use(morgan('dev'));

    io.sockets.on('connection', function(socket) {
        console.log('A new user connected!');
        socket.emit('info', {msg: 'hello client'});
    });
})();