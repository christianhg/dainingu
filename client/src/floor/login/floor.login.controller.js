(function () {
    'use strict';

    angular
        .module('dainingu.floor.login')
        .controller('FloorLoginController', FloorLoginController);

    function FloorLoginController($scope, $state, auth) {
        var vm = this;

        vm.loginData = {};

        $scope.floorLogin = function() {
            auth.signin(vm.loginData, function(data) {
                console.log(data);
                $state.go('floor', null, { reload: true });
            });
        };
    }
})();