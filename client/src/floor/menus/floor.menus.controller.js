(function () {
    'use strict';

    angular
        .module('dainingu.floor.menus')
        .controller('FloorMenusController', FloorMenusController);

    function FloorMenusController(menus, socket) {
        var vm = this;

        vm.getMenus = function() {
            menus.query({deep: true}, function(menus) {
                vm.menus = menus;
            });
        };

        vm.getMenus();

        socket.on('menusUpdated', function() {
            vm.getMenus();
        });


        vm.deactivateDish = function(dishId) {

        };
    }
})();