(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdController', DashboardMenusIdController);

    function DashboardMenusIdController(menus, $stateParams) {
        var vm = this;

        menus.get({id: $stateParams.id}, function(menu) {
            vm.menu = menu;
        });
    }
})();