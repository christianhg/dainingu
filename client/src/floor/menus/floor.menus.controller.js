(function () {
    'use strict';

    angular
        .module('dainingu.floor.menus')
        .controller('FloorMenusController', FloorMenusController);

    function FloorMenusController($scope, dishesActivate, menus, socket) {
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