(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessions', sessions);

    function sessions() {
        var directive = {
            templateUrl: 'widgets/sessions/sessions.view.html',
            restrict: 'E',
            scope: {
                //info: '='
            },
            controller: SessionsController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function SessionsController(sessions, socket) {
            var vm = this;

            vm.getSessions = function() {
                vm.sessions = sessions.query();
            };

            vm.getSessions();

            socket.on('ordersUpdated', function(data) {
                vm.getSessions();
            });
        }
    }
})();