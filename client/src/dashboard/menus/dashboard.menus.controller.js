(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusController', DashboardMenusController);

    function DashboardMenusController(menus) {
        var vm = this;

        vm.addMenu = function(menu) {
            menus.save(vm.menu, function(menu) {
                console.log(menu);
            });
        };
    }
})();