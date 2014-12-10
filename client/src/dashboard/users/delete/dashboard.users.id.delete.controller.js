(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdDeleteController', DashboardUsersIdDeleteController);

    function DashboardUsersIdDeleteController($scope, users, $state, $stateParams) {
        var vm = this;

        users.get({id: $stateParams.id}, function(user) {
            vm.user = user;
        });

        $scope.deleteUser = function() {
            users.delete({id: vm.user._id}, function(user) {
                $state.go('dashboard.users', null, { reload: true });
            });
        };
    }
})();