(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .directive('floorSession', floorSession);

    function floorSession() {
        var directive = {
            templateUrl: 'floor/sessions/session/floor.sessions.session.view.html',
            restrict: 'E',
            scope: {
                session: '='
            },
            controller: FloorSessionsSessionController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function FloorSessionsSessionController($scope, sessionsActivate, sessionsExpire) {
            var vm = this;

            vm.session = $scope.session;

            $scope.deactivateSession = function(sessionId) {
                sessionsActivate.deactivate({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            $scope.expireSession = function(sessionId) {
                sessionsExpire.expire({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            $scope.resumeSession = function(sessionId) {
                sessionsExpire.resume({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();