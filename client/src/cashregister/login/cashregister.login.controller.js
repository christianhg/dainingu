(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.login')
        .controller('CashregisterLoginController', CashregisterLoginController);

    function CashregisterLoginController($state, auth) {
        var vm = this;

        vm.loginData = {};

        vm.cashregisterLogin = function() {
            auth.signin(vm.loginData, function(data) {
                $state.go('cashregister', null, { reload: true });
            });
        };
    }
})();