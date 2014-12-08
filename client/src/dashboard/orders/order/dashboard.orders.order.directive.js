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

        function DashboardOrdersOrderController($scope, sessionsOrders, sessionsOrdersBegin, sessionsOrdersCommit, sessionsOrdersComplete, sessionsOrdersConfirm, sessionsOrdersServe, sessionsOrdersClose) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = {};
            vm.session._id = $scope.sessionId;

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

            vm.beginOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.begin({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.stopOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.stop({sessionId: sessionId, orderId: orderId}, function(data) {
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

            vm.serveOrder = function(sessionId, orderId) {
                sessionsOrdersServe.serve({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.returnOrder = function(sessionId, orderId) {
                sessionsOrdersServe.return({sessionId: sessionId, orderId: orderId}, function(data) {
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

        return directive;
    }
})();