(function () {
    'use strict';

    angular
        .module('dainingu.floor.login')
        .controller('FloorLoginController', FloorLoginController);

    function FloorLoginController() {
        var vm = this;

        vm.loginData = {};

        vm.floorLogin = function() {
            console.log(vm.loginData);
        };
    }
})();