(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.login')
        .controller('KitchenLoginController', KitchenLoginController);

    function KitchenLoginController($state, auth) {
        var vm = this;

        vm.loginData = {};

        vm.kitchenLogin = function() {
            auth.signin(vm.loginData, function(data) {
                $state.go('kitchen', null, { reload: true });
            });
        };
    }
})();