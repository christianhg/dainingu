(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesIdEditController', DashboardDishesIdEditController);

    function DashboardDishesIdEditController($scope, $state, $stateParams, dishes, menus) {
        var vm = this;

        vm.getDish = function() {
            dishes.get({id: $stateParams.id}, function(dish) {
                vm.dish = dish;
            });
        };

        vm.getDish();

        vm.getMenus = function() {
            menus.query(function(menus) {
                vm.menus = menus;
            });
        };

        vm.getMenus();

        $scope.editDish = function() {
            dishes.update({id: vm.dish.id}, vm.dish, function(data) {
                console.log(data);
                $state.go('dashboard.dishes', null, { reload: true });
            });
        };

    }
})();