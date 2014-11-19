(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.login')
        .controller('CashregisterLoginController', CashregisterLoginController);

    function CashregisterLoginController() {
        var vm = this;

        vm.loginData = {};

        vm.cashregisterLogin = function() {
            console.log(vm.loginData);
        };
    }
})();