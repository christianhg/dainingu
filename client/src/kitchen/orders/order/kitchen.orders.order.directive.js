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
        function KitchenOrdersOrderController($scope, sessionsOrdersBegin, sessionsOrdersComplete, sessionsOrdersConfirm) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;

            $scope.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.beginOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.begin({ sessionId: sessionId, orderId: orderId }, function(data) {
                    console.log(data);
                });
            };

            $scope.stopOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.stop({ sessionId: sessionId, orderId: orderId }, function(data) {
                    console.log(data);
                });
            };

            $scope.completeOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();