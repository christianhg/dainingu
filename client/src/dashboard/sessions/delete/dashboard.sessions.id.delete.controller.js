(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdDeleteController', DashboardSessionsIdDeleteController);

    function DashboardSessionsIdDeleteController($scope, $state, $stateParams, sessions) {
        var vm = this;

        vm.getSession = function() {
            sessions.get({ id: $stateParams.id }, function(session) {
                vm.session = session;
            });
        };

        vm.getSession();

        $scope.deleteSession = function() {
            sessions.delete({ id: vm.session._id }, function(data) {
                console.log(data);
                $state.go('dashboard.sessions', null, { reload: true });
            });
        };
    }
})();