(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus, socket) {
        var vm = this;

        socket.init().on('menuAdded', function(data) {
            console.log(data.message);
        });

        vm.menus = menus.query();

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
    }
})();