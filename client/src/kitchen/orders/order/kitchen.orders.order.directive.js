(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.orders')
        .directive('kitchenOrder', kitchenOrder);

    function kitchenOrder() {
        var directive = {
            templateUrl: 'kitchen/orders/order/kitchen.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                session: '='
            },
            controller: KitchenOrdersOrderController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function KitchenOrdersOrderController($scope) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;
        }

        return directive;
    }
})();