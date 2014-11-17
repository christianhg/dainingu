(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus) {
        var vm = this;

        vm.menus = menus.query();

        vm.addMenu = function() {
            menus.save(vm.menu, function(menu) {
                console.log(menu);
            });
        };

        vm.deleteMenu = function(id) {
            menus.delete({}, {'id': id}, function(menu) {
                vm.menus = menus.query();
            });
        };
    }
})();