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

        vm.closeSession = function(closedSession) {
            closedSession.expired = true;

            sessions.update({'id': closedSession._id}, closedSession, function(session) {

            });
        };

        vm.openSession = function(openedSession) {
            openedSession.expired = false;

            sessions.update({'id': openedSession._id}, openedSession, function(session) {

            });
        };
    }
})();