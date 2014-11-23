(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdDeleteController', DashboardSessionsIdDeleteController);

    function DashboardSessionsIdDeleteController(sessions, $state, $stateParams) {
        var vm = this;

        sessions.get({id: $stateParams.id}, function(session) {
            vm.session = session;
        });

        vm.deleteSession = function() {
            sessions.delete({id: vm.session._id}, function(session) {
                $state.go('dashboard.sessions', null, { reload: true });
            });
        };
    }
})();