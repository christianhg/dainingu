(function () {
    'use strict';

    var express = require('express');

    var buildServer = express();
    var distServer = express();

    buildServer.use(express.static('app/build'));
    distServer.use(express.static('app/dist'));

    buildServer.listen(3000);
    distServer.listen(4000);

})();