(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdDeleteController', DashboardSessionsIdDeleteController);

    function DashboardSessionsIdDeleteController($scope, $state, $stateParams, sessions) {
        var vm = this;

        sessions.get({ id: $stateParams.id }, function(session) {
            vm.session = session;
        });

        $scope.deleteSession = function() {
            sessions.delete({ id: vm.session._id }, function(data) {
                $state.go('dashboard.sessions', null, { reload: true });
            });
        };
    }
})();