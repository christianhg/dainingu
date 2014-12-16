(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdEditController', DashboardDishesIdEditController);

    function DashboardDishesIdEditController($scope, dishes, $state, $stateParams) {
        var vm = this;

        vm.getDish = function() {
            dishes.get({id: $stateParams.id}, function(dish) {
                vm.dish = dish;
            });
        };

        vm.getDish();

        $scope.editDish = function() {
            dishes.update({id: vm.dish.id}, vm.dish, function(data) {
                console.log(data);
                $state.go('dashboard.dishes', null, { reload: true });
            });
        };

    }
})();