(function () {
    'use strict';

    angular
        .module('dainingu.floor.orders')
        .directive('floorOrder', floorOrder);

    function floorOrder() {
        var directive = {
            templateUrl: 'floor/orders/order/floor.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                session: '='
            },
            controller: FloorOrdersOrderController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function FloorOrdersOrderController($scope, sessionsOrdersCommit, sessionsOrdersComplete, sessionsOrdersConfirm, sessionsOrdersServe) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;

            $scope.pullOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.confirmOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.confirm({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.incompleteOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.serveOrder = function(sessionId, orderId) {
                sessionsOrdersServe.serve({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.returnOrder = function(sessionId, orderId) {
                sessionsOrdersServe.return({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();