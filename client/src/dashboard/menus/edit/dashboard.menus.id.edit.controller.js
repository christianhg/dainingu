(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdEditController', DashboardMenusIdEditController);

    function DashboardMenusIdEditController($scope, $state, $stateParams, dishes, menus) {
        var vm = this;

        menus.get({ id: $stateParams.id }, function(menu) {
            vm.menu = menu;
        });

        dishes.query(function(dishes) {
            vm.dishes = dishes;
        });

        $scope.editMenu = function() {
            menus.update({id: vm.menu.id}, vm.menu, function(data) {
                $state.go('dashboard.menus', null, { reload: true });
            });
        };

    }
})();