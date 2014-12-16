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
        function DashboardOrdersOrderController($scope, sessionsOrders, sessionsOrdersDishes) {
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
        }

        return directive;
    }
})();