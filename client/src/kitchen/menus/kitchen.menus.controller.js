(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.menus')
        .controller('KitchenMenusController', KitchenMenusController);

    function KitchenMenusController(menus) {
        var vm = this;

        vm.getMenus = function() {
            menus.query({deep: true}, function(menus) {
                vm.menus = menus;
            });
        };

        vm.getMenus();
    }
})();