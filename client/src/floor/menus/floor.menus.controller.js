(function () {
    'use strict';

    angular
        .module('dainingu.floor.menus')
        .controller('FloorMenusController', FloorMenusController);

    function FloorMenusController(socket) {
        var vm = this;

        socket.on('menuAdded', function(data) {
            console.log(data.message);
        });

        socket.on('menuUpdated', function(data) {
            console.log(data.message);
        });

        socket.on('menuDeleted', function(data) {
            console.log(data.message);
        });
    }
})();