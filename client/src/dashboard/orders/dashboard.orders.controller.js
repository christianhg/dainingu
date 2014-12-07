(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardOrdersController', DashboardOrdersController);

    function DashboardOrdersController(orders, sessions, socket) {
        var vm = this;

        vm.getOrders = function() {
            orders.query(function(orders) {
                vm.orders = orders;
            });
        };

        vm.getOrders();

        vm.getSessions = function() {
            sessions.query(function(sessions) {
                vm.sessions = sessions;
            });
        };

        vm.getSessions();

        socket.on('ordersUpdated', function() {
            vm.getOrders();
        });

        socket.on('sessionsUpdated', function() {
            vm.getOrders();
        });
    }
})();