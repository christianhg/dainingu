(function () {
    'use strict';

    angular
        .module('dainingu.floor.login')
        .controller('FloorLoginController', FloorLoginController);

    function FloorLoginController($state, auth) {
        var vm = this;

        vm.loginData = {};

        $scope.floorLogin = function() {
            auth.signin(vm.loginData, function(data) {
                $state.go('floor', null, { reload: true });
            });
        };
    }
})();