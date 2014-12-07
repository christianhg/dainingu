(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('sessionInfo', sessionInfo);

    function sessionInfo() {
        var directive = {
            templateUrl: 'widgets/session/info/session.info.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();