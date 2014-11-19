(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth) {
        var vm = this;

        vm.dashboardLogin = function(loginData) {
            auth.signin(loginData, function(data) {
                console.log(data);
            });
        };
    }
})();