(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.orders')
        .directive('cashregisterOrder', cashregisterOrder);

    function cashregisterOrder() {
        var directive = {
            templateUrl: 'cashregister/orders/order/cashregister.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                session: '='
            },
            controller: CashregisterOrdersOrderController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function CashregisterOrdersOrderController($scope) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;
        }

        return directive;
    }
})();