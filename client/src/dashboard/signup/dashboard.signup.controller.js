(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.signup')
        .controller('DashboardSignupController', DashboardSignupController);

    function DashboardSignupController($scope, $state, $stateParams, auth) {
        var vm = this;

        vm.signupToken = $stateParams.token;

        $scope.dashboardSignup = function() {
            auth.signup({ username: vm.user.username, password: vm.user.password, signupToken: vm.signupToken }, function(data) {
                console.log(data);
                vm.user = {};
                if(data.success) {
                    $state.go('dashboard.login', null, { reload: true });
                }
            });
        };
    }
})();