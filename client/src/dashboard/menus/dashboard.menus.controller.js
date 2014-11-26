(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus, menusDishes, socket) {
        var vm = this;

        socket.on('menuAdded', function(data) {
            console.log(data.message);
        });

        socket.on('menuUpdated', function(data) {
            console.log(data.message);
        });

        socket.on('menuDeleted', function(data) {
            console.log(data.message);
        });

        vm.menus = [];

        menus.query({deep: true}, function(menus) {
            vm.menus = menus;
        });

        vm.addMenu = function(newMenu) {
            menus.save(newMenu, function(menu) {
                //vm.menus = menus.query();
            });
        };

        vm.deleteMenu = function(id) {
            menus.delete({}, {'id': id}, function(menu) {
                vm.menus = menus.query();
            });
        };

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