(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdDeleteController', DashboardDishesIdDeleteController);

    function DashboardDishesIdDeleteController($scope, dishes, $state, $stateParams) {
        var vm = this;

        vm.getDish = function() {
            dishes.get({id: $stateParams.id}, function(dish) {
                vm.dish = dish;
            });
        };

        vm.getDish();

        $scope.deleteDish = function() {
            dishes.delete({id: vm.dish.id}, function(data) {
                console.log(data);
                $state.go('dashboard.dishes', null, { reload: true });
            });
        };
    }
})();