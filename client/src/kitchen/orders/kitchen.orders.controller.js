(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.orders')
        .controller('KitchenOrdersController', KitchenOrdersController);

    function KitchenOrdersController(sessions, sessionsOrdersConfirm, sessionsOrdersComplete, socket) {
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

        vm.rejectOrder = function(sessionId, orderId) {
            sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };

        vm.completeOrder = function(sessionId, orderId) {
            sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };

        vm.incompleteOrder = function(sessionId, orderId) {
            sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                console.log(data);
            });
        };
    }
})();