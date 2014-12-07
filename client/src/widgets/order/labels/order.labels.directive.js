(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderLabels', orderLabels);

    function orderLabels() {
        var directive = {
            templateUrl: 'widgets/order/labels/order.labels.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();