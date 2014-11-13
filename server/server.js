(function () {
    'use strict';

    var bodyParser = require('body-parser');
    var express = require('express');
    var http = require('http');
    var methodOverride = require('method-override');
    var mongoose = require('mongoose');
    var morgan = require('morgan');

    var app = express();
    var server = app.listen(2000);


    mongoose.connect('mongodb://localhost/dainingu');



    app.use(express.static(__dirname + '/../client/build'));

    app.use(morgan('dev'));

    // get data from html forms
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // faux http method support
    app.use(methodOverride());

    var io = require('./socket')(server);

    require('./routes')(app, io);




})();