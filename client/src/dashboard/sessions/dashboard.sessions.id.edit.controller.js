(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdEditController', DashboardSessionsIdEditController);

    function DashboardSessionsIdEditController(sessions, $stateParams) {
        var vm = this;

        sessions.get({id: $stateParams.id}, function(session) {
            vm.session = session;
        });


        vm.editSession = function() {
            sessions.update({id: vm.session._id}, vm.session, function(session) {
                console.log(session);
            });
        };

    }
})();