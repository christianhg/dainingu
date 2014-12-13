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
        function CashregisterOrdersOrderController($scope, sessionsOrdersClose) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;

            $scope.closeOrder = function(sessionId, orderId) {
                sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.openOrder = function(sessionId, orderId) {
                sessionsOrdersClose.open({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

        }

        return directive;
    }
})();