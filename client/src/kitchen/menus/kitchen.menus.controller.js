(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.menus')
        .controller('KitchenMenusController', KitchenMenusController);

    function KitchenMenusController(dishesActivate, menus, socket) {
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

        vm.activateDish = function(dishId) {
            dishesActivate.activate({dishId: dishId}, function(data) {
                console.log(data);
            });
        };

        vm.deactivateDish = function(dishId) {
            dishesActivate.deactivate({dishId: dishId}, function(data) {
                console.log(data);
            });
        };



    }
})();