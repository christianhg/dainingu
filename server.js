(function () {
    'use strict';

    var express = require('express');

    var server = express();

    server.use(express.static('app/build'));

    server.listen(3000);

})();