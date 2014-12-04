(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.orders')
        .directive('order', order);

    function order() {
        var directive = {
            templateUrl: 'kitchen/orders/order/kitchen.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                sessionId: '@'
            },
            controller: KitchenOrdersOrderController,
            controllerAs: 'vm'
        };

        function KitchenOrdersOrderController($scope, sessionsOrdersComplete, sessionsOrdersConfirm) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            vm.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
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