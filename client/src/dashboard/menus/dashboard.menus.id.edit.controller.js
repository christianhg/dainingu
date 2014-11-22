(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .controller('DashboardMenusIdEditController', DashboardMenusIdEditController);

    function DashboardMenusIdEditController(dishes, menus, $stateParams) {
        var vm = this;

        menus.get({id: $stateParams.id}, function(menu) {
            vm.menu = menu;
        });

        dishes.query(function(dishes) {
            vm.dishes = dishes;
        });

        vm.editMenu = function() {
            menus.update({id: vm.menu.id}, vm.menu, function(menu) {
                console.log(menu);
            });
        };

    }
})();