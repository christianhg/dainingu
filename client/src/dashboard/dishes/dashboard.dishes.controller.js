(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController($scope, dishes, dishesActivate, socket) {
        var vm = this;

        vm.getDishes = function() {
            // Add deep query parameter to get related menus.
            dishes.query({ deep: true }, function(dishes) {
                vm.dishes = dishes;
            });
        };

        vm.getDishes();

        socket.on('dishesUpdated', function() {
            vm.getDishes();
        });

        $scope.activateDish = function(dishId) {
            dishesActivate.activate({dishId: dishId}, function(data) {

            });
        };

        $scope.deactivateDish = function(dishId) {
            dishesActivate.deactivate({dishId: dishId}, function(data) {

            });
        };
    }
})();