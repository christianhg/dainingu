(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('alerts', alerts);

    function alerts() {
        var directive = {
            templateUrl: 'widgets/alerts/alerts.view.html',
            restrict: 'E',
            scope: {
            },
            controller: AlertsController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function AlertsController($scope, socket) {
            var vm = this;

            vm.alerts = [];

            socket.on('alert', function(alert) {
                vm.alerts = [];
                // push new alert to alert array
                vm.alerts.push(alert);
            });

            $scope.closeAlert = function(index) {
                // remove alert from alert array
                vm.alerts.splice(index, 1);
            };
        }
    }
})();