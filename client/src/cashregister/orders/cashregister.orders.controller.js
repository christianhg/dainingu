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

        vm.closeOrder = function(sessionId, orderId) {
            sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };

        vm.openOrder = function(sessionId, orderId) {
            sessionsOrdersClose.open({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };
    }
})();