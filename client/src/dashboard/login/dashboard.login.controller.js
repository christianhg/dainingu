(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth, $state) {
        var vm = this;

        vm.dashboardLogin = function(loginData) {
            auth.signin(loginData, function(data) {
                $state.go('dashboard', null, { reload: true });
            });
        };
    }
})();