(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController(dishes, socket) {
        var vm = this;

        vm.getDishes = function() {
            vm.dishes = dishes.query();
        };

        vm.getDishes();

        socket.on('dishes:updated', function() {
            vm.getDishes();
        });


    }
})();