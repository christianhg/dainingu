(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.orders')
        .controller('KitchenOrdersController', KitchenOrdersController);

    function KitchenOrdersController(orders, sessionsOrdersConfirm, sessionsOrdersComplete, socket) {
        var vm = this;

        vm.getOrders = function() {
            orders.query(function(orders) {
                vm.orders = orders;
            });
        };

        vm.getOrders();

        socket.on('ordersUpdated', function() {
            vm.getOrders();
        });

        socket.on('sessionsUpdated', function() {
            vm.getOrders();
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