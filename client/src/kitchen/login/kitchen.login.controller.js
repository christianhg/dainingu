(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.login')
        .controller('KitchenLoginController', KitchenLoginController);

    function KitchenLoginController($scope, $state, auth) {
        var vm = this;

        vm.loginData = {};

        $scope.kitchenLogin = function() {
            auth.signin(vm.loginData, function(data) {
                console.log(data);
                $state.go('kitchen', null, { reload: true });
            });
        };
    }
})();