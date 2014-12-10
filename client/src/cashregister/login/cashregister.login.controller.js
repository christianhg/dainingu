(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.login')
        .controller('CashregisterLoginController', CashregisterLoginController);

    function CashregisterLoginController($scope, $state, auth) {
        var vm = this;

        vm.loginData = {};

        $scope.cashregisterLogin = function() {
            auth.signin(vm.loginData, function(data) {
                $state.go('cashregister', null, { reload: true });
            });
        };
    }
})();