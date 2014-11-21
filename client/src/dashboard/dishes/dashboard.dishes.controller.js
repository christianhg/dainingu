(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController(dishes, socket) {
        var vm = this;

        vm.dishes = dishes.query();

        vm.deleteDish = function(dishId) {
            dishes.delete({'id': dishId}, function(dish) {
                console.log(dish);
                vm.dishes = dishes.query();
            });
        };

        vm.addDish = function(dish) {
            dishes.save(dish, function(dish) {
                console.log(dish);
                vm.dishes = dishes.query();
            });
        };

    }
})();