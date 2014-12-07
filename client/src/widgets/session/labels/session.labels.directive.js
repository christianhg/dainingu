(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionLabels', sessionLabels);

    function sessionLabels() {
        var directive = {
            templateUrl: 'widgets/session/labels/session.labels.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();