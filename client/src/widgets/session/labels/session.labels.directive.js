(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionLabels', sessionLabels);

    function sessionLabels() {
        var directive = {
            templateUrl: 'widgets/session/labels/session.labels.view.html',
            restrict: 'E',
            scope: {
                session: '='
            },
            controller: SessionLabelsController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function SessionLabelsController($scope) {
            var vm = this;

            vm.session = $scope.session;
        }
    }
})();