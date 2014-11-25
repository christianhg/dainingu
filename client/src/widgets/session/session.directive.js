(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('session', session);

    function session() {
        var directive = {
            templateUrl: 'widgets/session/session.view.html',
            restrict: 'E',
            scope: {
                session: '='
            },
            controller: SessionController,
            controllerAs: 'vm',
            transclude: true
        };

        return directive;

        /**
         * @ngInject
         */
        function SessionController($scope, sessions, sessionsActivate, sessionsExpire) {
            var vm = this;

            vm.session = $scope.session;

            vm.activateSession = function(sessionId) {
                sessionsActivate.activate({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.deactivateSession = function(sessionId) {
                sessionsActivate.deactivate({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.expireSession = function(sessionId) {
                sessionsExpire.expire({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.resumeSession = function(sessionId) {
                sessionsExpire.resume({sessionId: sessionId}, function(data) {
                    console.log(data);
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

            vm.deleteSession = function(id) {
                sessions.delete({}, {'id': id}, function(session) {
                    vm.sessions = sessions.query();
                });
            };
        }
    }
})();