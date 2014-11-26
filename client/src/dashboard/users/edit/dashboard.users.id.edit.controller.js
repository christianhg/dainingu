(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdEditController', DashboardUsersIdEditController);

    function DashboardUsersIdEditController(users, $state, $stateParams) {
        var vm = this;

        users.get({id: $stateParams.id}, function(user) {
            vm.user = user;
        });

        vm.editUser = function() {
            users.update({id: vm.user._id}, vm.user, function(user) {
                $state.go('dashboard.users', null, { reload: true });
            });
        };

    }
})();