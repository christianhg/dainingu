(function () {
    'use strict';

    var express = require('express');

    var server = express();

    server.use(express.static('app/dist'));

    server.listen(3000);

})();