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
                sessionId: '='
            },
            controller: KitchenOrdersOrderController,
            controllerAs: 'vm'
        };

        function KitchenOrdersOrderController($scope, sessionsOrdersBegin, sessionsOrdersComplete, sessionsOrdersConfirm) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            vm.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.beginOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.begin({ sessionId: sessionId, orderId: orderId }, function(data) {
                    console.log(data);
                })
            };

            vm.stopOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.stop({ sessionId: sessionId, orderId: orderId }, function(data) {
                    console.log(data);
                })
            };

            vm.completeOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();