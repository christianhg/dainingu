(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('mainNav', mainNav);

    function mainNav() {
        var directive = {
            templateUrl: 'widgets/mainNav/mainNav.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();