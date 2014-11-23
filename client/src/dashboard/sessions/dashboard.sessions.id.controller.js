(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdController', DashboardSessionsIdController);

    function DashboardSessionsIdController(sessions, $stateParams) {
        var vm = this;

        sessions.get({id: $stateParams.id}, function(session) {
            vm.session = session;
        });
    }
})();