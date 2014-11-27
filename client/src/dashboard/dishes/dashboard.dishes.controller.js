(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController(dishes, socket) {
        var vm = this;

        vm.getDishes = function() {
            dishes.query({deep: true}, function(dishes) {
                vm.dishes = dishes;
            });
        };

        vm.getDishes();

        socket.on('dishesUpdated', function() {
            vm.getDishes();
        });

        socket.on('menus:dishes:delete', function() {
            vm.getDishes();
        });

    }
})();