(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdDeleteController', DashboardMenusIdDeleteController);

    function DashboardMenusIdDeleteController($scope, $state, $stateParams, menus) {
        var vm = this;

        vm.getMenu = function() {
            menus.get({ id: $stateParams.id }, function(menu) {
                vm.menu = menu;
            });
        };

        vm.getMenu();

        $scope.deleteMenu = function() {
            menus.delete({ id: vm.menu.id }, function(data) {
                console.log(data);
                $state.go('dashboard.menus', null, {reload: true});
            });
        };
    }
})();