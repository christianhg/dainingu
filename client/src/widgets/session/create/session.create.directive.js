(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionCreate', sessionCreate);

    function sessionCreate() {
        var directive = {
            templateUrl: 'widgets/session/create/session.create.view.html',
            restrict: 'E',
            scope: {
            },
            controller: SessionCreateController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function SessionCreateController(sessions) {
            var vm = this;

            vm.addSession = function() {
                sessions.save(vm.session, function(session) {
                    vm.session = {};
                });
            };
        }
    }
})();