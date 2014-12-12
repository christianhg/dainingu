(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController($scope, auth, $state) {
        var vm = this;

        $scope.dashboardLogin = function(loginData) {
            auth.signin(loginData, function(data) {
                vm.loginData = {};
                console.log(data);
                if(data.success) {
                    $state.go('dashboard', null, { reload: true });
                }
            });
        };
    }
})();