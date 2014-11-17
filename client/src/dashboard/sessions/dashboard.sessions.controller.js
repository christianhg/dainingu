(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsController', DashboardSessionsController);

    function DashboardSessionsController(sessions) {
        var vm = this;

        vm.sessions = sessions.query();

        vm.addSession = function(newSession) {
            sessions.save(newSession, function(session) {
               vm.sessions = sessions.query();
            });
        };

        vm.deleteSession = function(id) {
            sessions.delete({}, {'id': id}, function(session) {
                vm.sessions = sessions.query();
            });
        };

        vm.expireSession = function(expiredSession) {
            expiredSession.expired = true;

            sessions.update({'id': expiredSession._id}, expiredSession, function(session) {

            });
        };
    }
})();