(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderDishes', orderDishes);

    function orderDishes() {
        var directive = {
            templateUrl: 'widgets/order/dishes/order.dishes.view.html',
            restrict: 'E'
        };

        return directive;
    }
})();