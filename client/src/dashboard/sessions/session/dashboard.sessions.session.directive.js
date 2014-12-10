(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .directive('dashboardSession', dashboardSession);

    function dashboardSession() {
        var directive = {
            templateUrl: 'dashboard/sessions/session/dashboard.sessions.session.view.html',
            restrict: 'E',
            scope: {
                session: '='
            },
            controller: DashboardSessionsSessionController,
            controllerAs: 'vm'
        };

        function DashboardSessionsSessionController($scope, sessionsActivate, sessionsExpire) {
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
        }

        return directive;
    }
})();