(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdDeleteController', DashboardDishesIdDeleteController);

    function DashboardDishesIdDeleteController(dishes, $state, $stateParams) {
        var vm = this;

        dishes.get({id: $stateParams.id}, function(dish) {
            vm.dish = dish;
        });

        vm.deleteDish = function() {
            dishes.delete({id: vm.dish.id}, function(data) {
                $state.go('dashboard.dishes', null, { reload: true });
            });
        };
    }
})();