(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.login')
        .controller('KitchenLoginController', KitchenLoginController);

    function KitchenLoginController() {
        var vm = this;

        vm.loginData = {};

        vm.kitchenLogin = function() {
            console.log(vm.loginData);
        };
    }
})();