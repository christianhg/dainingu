(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth) {
        var vm = this;

        vm.loginData = {};

        vm.dashboardLogin = function(loginData) {
             auth.save(loginData, function(user) {
                console.log(user);
            });
        };

    }
})();