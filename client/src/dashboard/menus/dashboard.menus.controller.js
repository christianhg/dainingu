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

        socket.on('menus:updated', function(data) {
            vm.getMenus();
        });


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