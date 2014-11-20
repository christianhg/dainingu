(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(dishes, menus, menusDishes, socket) {
        var vm = this;

        socket.init().on('menuAdded', function(data) {
            console.log(data.message);
        });

        vm.menus = [];

        menus.query(function(menus) {
            angular.forEach(menus, function(menu) {
                menusDishes.find({id: menu.id}, function(dishes) {
                    menu.dishes = dishes;
                    vm.menus.push(menu);
                });
            });
        });


        vm.addMenu = function(newMenu) {
            menus.save(newMenu, function(menu) {
                vm.menus = menus.query();
            });
        };

        vm.deleteMenu = function(id) {
            menus.delete({}, {'id': id}, function(menu) {
                vm.menus = menus.query();
            });
        };

        vm.addDish = function(menuId, dish) {

            dishes.save(dish, function(dish) {
                menus.update({'id': menuId}, {dish: dish}, function(menu) {
                   console.log(menu);
                });
            });

            /*menus.update({'id': menuId}, {dish: dish}, function(menu) {

            });*/
        };

    }
})();