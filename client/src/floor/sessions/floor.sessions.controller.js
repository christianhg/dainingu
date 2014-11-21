(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .controller('FloorSessionsController', FloorSessionsController);

    function FloorSessionsController(sessions, socket) {
        var vm = this;

        vm.sessions = sessions.query();

        socket.on('sessionAdded', function(data) {
            console.log(data.message);
        });

        socket.on('sessionUpdated', function(data) {
            console.log(data.message);
        });

        socket.on('sessionDeleted', function(data) {
            console.log(data.message);
        });
    }
})();