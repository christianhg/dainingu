(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionAlerts', sessionAlerts);

    function sessionAlerts() {
        var directive = {
            templateUrl: 'widgets/session/alerts/session.alerts.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();