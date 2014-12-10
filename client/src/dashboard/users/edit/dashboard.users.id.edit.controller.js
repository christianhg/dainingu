(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersIdEditController', DashboardUsersIdEditController);

    function DashboardUsersIdEditController($scope, users, $state, $stateParams) {
        var vm = this;

        users.get({id: $stateParams.id}, function(user) {
            vm.user = user;
        });

        $scope.editUser = function() {
            users.update({id: vm.user._id}, vm.user, function(data) {
                $state.go('dashboard.users', null, { reload: true });
            });
        };

    }
})();