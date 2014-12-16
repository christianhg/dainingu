(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdDeleteController', DashboardUsersIdDeleteController);

    function DashboardUsersIdDeleteController($scope, users, $state, $stateParams) {
        var vm = this;

        vm.getUser = function() {
            users.get({id: $stateParams.id}, function(user) {
                vm.user = user;
            });
        };

        vm.getUser();

        $scope.deleteUser = function() {
            users.delete({id: vm.user._id}, function(data) {
                console.log(data);
                $state.go('dashboard.users', null, { reload: true });
            });
        };
    }
})();