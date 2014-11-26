(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdDeleteController', DashboardUsersIdDeleteController);

    function DashboardUsersIdDeleteController(users, $state, $stateParams) {
        var vm = this;

        users.get({id: $stateParams.id}, function(user) {
            vm.user = user;
        });

        vm.deleteUser = function() {
            users.delete({id: vm.user._id}, function(user) {
                $state.go('dashboard.users', null, { reload: true });
            });
        };
    }
})();