(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdController', DashboardDishesIdController);

    function DashboardDishesIdController(dishes, $stateParams) {
        var vm = this;

        dishes.get({id: $stateParams.id}, function(dish) {
            vm.dish = dish;
        });
    }
})();