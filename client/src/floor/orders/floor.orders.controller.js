(function () {
    'use strict';

    angular
        .module('dainingu.floor.orders')
        .controller('FloorOrdersController', FloorOrdersController);

    function FloorOrdersController(sessions, sessionsOrdersClose, sessionsOrdersCommit, sessionsOrdersComplete, sessionsOrdersConfirm, socket) {
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

        vm.incompleteOrder = function(sessionId, orderId) {
            sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };

        vm.closeOrder = function(sessionId, orderId) {
            sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };
    }
})();