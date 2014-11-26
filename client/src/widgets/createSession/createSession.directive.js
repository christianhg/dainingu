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

            vm.addSession = function() {
                sessions.save(vm.session, function(session) {
                    vm.session = {};
                });
            };
        }
    }
})();