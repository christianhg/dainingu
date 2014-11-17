(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus) {
        var vm = this;

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