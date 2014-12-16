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
        function SessionCreateController($scope, sessions) {
            var vm = this;

            $scope.addSession = function() {
                sessions.save(vm.session, function(data) {
                    console.log(data);
                    vm.session = {};
                });
            };
        }
    }
})();