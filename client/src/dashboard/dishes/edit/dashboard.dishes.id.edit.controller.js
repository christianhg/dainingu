(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdEditController', DashboardDishesIdEditController);

    function DashboardDishesIdEditController(dishes, menus, $state, $stateParams) {
        var vm = this;

        dishes.get({id: $stateParams.id}, function(dish) {
            vm.dish = dish;
        });

        menus.query(function(menus) {
            vm.menus = menus;
        });

        vm.editDish = function() {
            dishes.update({id: vm.dish.id}, vm.dish, function(dish) {
                $state.go('dashboard.dishes', null, {reload: true});
            });
        };

    }
})();