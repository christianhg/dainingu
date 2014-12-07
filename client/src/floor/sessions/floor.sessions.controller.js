(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .controller('FloorSessionsController', FloorSessionsController);

    function FloorSessionsController(sessions, socket) {
        var vm = this;

        vm.getSessions = function() {
            sessions.query(function(sessions) {
                vm.sessions = sessions;
            });
        };

        vm.getSessions();

        socket.on('ordersUpdated', function() {
            vm.getSessions();
        });

        socket.on('sessionsUpdated', function() {
            vm.getSessions();
        });
    }
})();