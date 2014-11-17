(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController() {
        var vm = this;

        vm.loginData = {};

        vm.dashboardLogin = function() {
            console.log(vm.loginData);
        };

    }
})();