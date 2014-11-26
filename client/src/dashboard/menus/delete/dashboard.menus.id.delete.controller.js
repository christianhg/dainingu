(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdDeleteController', DashboardMenusIdDeleteController);

    function DashboardMenusIdDeleteController(menus, $state, $stateParams) {
        var vm = this;

        menus.get({id: $stateParams.id}, function(menu) {
            vm.menu = menu;
        });

        vm.deleteMenu = function() {
            menus.delete({id: vm.menu.id}, function(menu) {
                $state.go('dashboard.menus', null, {reload: true});
            });
        };
    }
})();