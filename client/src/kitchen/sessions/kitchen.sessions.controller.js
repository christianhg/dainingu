(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.sessions')
        .controller('KitchenSessionsController', KitchenSessionsController);

    function KitchenSessionsController(sessions, socket) {
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