(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.menus')
        .controller('KitchenMenusController', KitchenMenusController);

    function KitchenMenusController($scope, dishesActivate, menus, socket) {
        var vm = this;

        vm.getMenus = function() {
            menus.query({deep: true}, function(menus) {
                vm.menus = menus;
            });
        };

        vm.getMenus();

        socket.on('menusUpdated', function() {
            vm.getMenus();
        });

        socket.on('dishesUpdated', function() {
            vm.getMenus();
        });

        $scope.activateDish = function(dishId) {
            dishesActivate.activate({dishId: dishId}, function(data) {
                console.log(data);
            });
        };

        $scope.deactivateDish = function(dishId) {
            dishesActivate.deactivate({dishId: dishId}, function(data) {
                console.log(data);
            });
        };



    }
})();