(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('createSession', createSession);

    function createSession() {
        var directive = {
            templateUrl: 'widgets/createSession/createSession.view.html',
            restrict: 'E',
            scope: {
                //info: '='
            },
            controller: CreateSessionController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function CreateSessionController(sessions) {
            var vm = this;

            vm.addSession = function(newSession) {
                sessions.save(newSession, function(session) {
                    console.log(session)
                });
            };
        }
    }
})();