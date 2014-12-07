(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionTitle', sessionTitle);

    function sessionTitle() {
        var directive = {
            templateUrl: 'widgets/session/title/session.title.view.html',
            restrict: 'E',
            transclude: true
        };

        return directive;
    }
})();