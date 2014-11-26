(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus, menusDishes, socket) {
        var vm = this;

        vm.getMenus = function() {
            menus.query({deep: true}, function(menus) {
                vm.menus = menus;
            });
        };

        vm.getMenus();

        socket.on('menus:add', function() {
            vm.getMenus();
        });

        socket.on('menus:delete', function() {
            vm.getMenus();
        });

        socket.on('menus:update', function() {
            vm.getMenus();
        });

        socket.on('menus:dishes:delete', function() {
            vm.getMenus();
        });

        socket.on('menus:dishes:add', function() {
            vm.getMenus();
        });


        vm.addDishToMenu = function(menuId, dish) {
            menusDishes.save({'id': menuId}, dish, function(dish) {

            });
        };

        vm.deleteDishFromMenu = function(menuId, dishId) {
            menusDishes.delete({ 'menuId': menuId, 'dishId': dishId }, function(dish) {

            });
        };
    }
})();