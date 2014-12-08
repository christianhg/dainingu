(function () {
    'use strict';

    angular
        .module('dainingu.floor.orders')
        .controller('FloorOrdersController', FloorOrdersController);

    function FloorOrdersController(orders, socket) {
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
    }
})();