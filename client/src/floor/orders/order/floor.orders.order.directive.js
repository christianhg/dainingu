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
                sessionId: '='
            },
            controller: FloorOrdersOrderController,
            controllerAs: 'vm'
        };

        function FloorOrdersOrderController($scope, sessionsOrdersCommit, sessionsOrdersComplete, sessionsOrdersConfirm, sessionsOrdersServe) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            vm.pullOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.confirmOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.confirm({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.incompleteOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.serveOrder = function(sessionId, orderId) {
                sessionsOrdersServe.serve({sessionId: sessionId, orderId: orderId}, function(data) {

                });
            };
        }

        return directive;
    }
})();