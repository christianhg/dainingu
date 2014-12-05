(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.orders')
        .controller('CashregisterOrdersController', CashregisterOrdersController);

    function CashregisterOrdersController(sessions, sessionsOrdersClose, socket) {
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