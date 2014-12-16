(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdEditController', DashboardMenusIdEditController);

    function DashboardMenusIdEditController($scope, $state, $stateParams, menus) {
        var vm = this;

        vm.getMenu = function() {
            menus.get({ id: $stateParams.id }, function(menu) {
                vm.menu = menu;
            });
        };

        vm.getMenu();

        $scope.editMenu = function() {
            menus.update({id: vm.menu.id}, vm.menu, function(data) {
                console.log(data);
                $state.go('dashboard.menus', null, { reload: true });
            });
        };

    }
})();