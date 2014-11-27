(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('order', order);

    function order() {
        var directive = {
            templateUrl: 'widgets/order/order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                session: '='
            },
            controller: OrderController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderController($scope, sessionsOrders, sessionsOrdersCommit, sessionsOrdersConfirm, sessionsOrdersComplete, sessionsOrdersClose, sessionsOrdersDishes, socket) {
            var vm = this;

            vm.order = $scope.order;

            vm.session = $scope.session;

            vm.deleteOrder = function(sessionId, orderId) {
                sessionsOrders.delete({sessionId: sessionId, orderId: orderId}, function(data) {

                });
            };

            vm.removeDishFromOrder = function(sessionId, orderId, dishId) {
                sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
                    console.log(data);
                });
            };

            vm.commitOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

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

            vm.incompleteOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.closeOrder = function(sessionId, orderId) {
                sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.openOrder = function(sessionId, orderId) {
                sessionsOrdersClose.open({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();