(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderInfo', orderInfo);

    function orderInfo() {
        var directive = {
            templateUrl: 'widgets/order/info/order.info.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();