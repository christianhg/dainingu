(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdEditController', DashboardUsersIdEditController);

    function DashboardUsersIdEditController($scope, users, $state, $stateParams) {
        var vm = this;

        vm.getUser = function() {
            users.get({id: $stateParams.id}, function(user) {
                vm.user = user;
            });
        };

        vm.getUser();

        $scope.editUser = function() {
            users.update({id: vm.user._id}, vm.user, function(data) {
                console.log(data);
                $state.go('dashboard.users', null, { reload: true });
            });
        };

    }
})();