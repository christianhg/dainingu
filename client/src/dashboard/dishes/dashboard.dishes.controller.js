(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController(dishes, socket) {
        var vm = this;

        vm.getDishes = function() {
            dishes.query(function(dishes) {
                vm.dishes = dishes;
            });
        };

        vm.getDishes();

        socket.on('dishes:add', function() {
            vm.getDishes();
        });

        socket.on('menus:dishes:delete', function() {
            vm.getDishes();
        });

    }
})();