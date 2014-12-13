(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.orders')
        .directive('dashboardOrder', dashboardOrder);

    function dashboardOrder() {
        var directive = {
            templateUrl: 'dashboard/orders/order/dashboard.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '=',
                sessionId: '='
            },
            controller: DashboardOrdersOrderController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function DashboardOrdersOrderController($scope, sessionsOrders, sessionsOrdersBegin, sessionsOrdersCommit, sessionsOrdersComplete, sessionsOrdersConfirm, sessionsOrdersDishes, sessionsOrdersServe, sessionsOrdersClose) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.deleteOrder = function(sessionId, orderId) {
                sessionsOrders.delete({sessionId: sessionId, orderId: orderId}, function(data) {

                });
            };

            $scope.removeDishFromOrder = function(sessionId, orderId, dishId) {
                sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
                    console.log(data);
                });
            };

            $scope.commitOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

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

            $scope.beginOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.begin({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.stopOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.stop({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            $scope.completeOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
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