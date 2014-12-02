(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .controller('FloorSessionsController', FloorSessionsController);

    function FloorSessionsController(sessions, sessionsOrdersCommit, sessionsOrdersConfirm, socket) {
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

        vm.pullOrder = function(sessionId, orderId) {
            sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };

        vm.confirmOrder = function(sessionId, orderId) {
            sessionsOrdersConfirm.confirm({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };
    }
})();