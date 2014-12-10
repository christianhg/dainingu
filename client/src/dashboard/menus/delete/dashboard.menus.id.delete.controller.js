(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdDeleteController', DashboardMenusIdDeleteController);

    function DashboardMenusIdDeleteController($scope, $state, $stateParams, menus) {
        var vm = this;

        menus.get({ id: $stateParams.id }, function(menu) {
            vm.menu = menu;
        });

        $scope.deleteMenu = function() {
            menus.delete({ id: vm.menu.id }, function(data) {
                $state.go('dashboard.menus', null, {reload: true});
            });
        };
    }
})();