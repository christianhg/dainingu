(function () {
    'use strict';

    angular
        .module('dainingu.menucard')
        .directive('menucardOrder', menucardOrder);

    function menucardOrder() {
        var directive = {
            templateUrl: 'menucard/orders/order/menucard.orders.order.view.html',
            restrict: 'E',
            scope: {
                order: '='
            },
            controller: MenucardOrdersOrderController,
            controllerAs: 'vm'
        };

        /**
         * @ngInject
         */
        function MenucardOrdersOrderController($scope, activeOrder, menucard) {
            var vm = this;

            vm.order = $scope.order;

            $scope.commitOrder = function(orderId) {
                menucard.commitOrder(orderId, function(data) {
                    $scope.resetActiveOrder();
                });
            };

            $scope.returnOrder = function(orderId) {
                menucard.returnOrder(orderId, function(data) {
                    $scope.resetActiveOrder();
                });
            };

            $scope.activateOrder = function(orderId) {
                activeOrder.set(orderId);
            };

            $scope.resetActiveOrder = function() {
                activeOrder.delete();
            };

            $scope.getActiveOrder = function() {
                return activeOrder.get();
            };

            $scope.orderActive = function(orderId) {
                return activeOrder.check(orderId);
            };

            $scope.removeDishFromOrder = function(dishId) {
                var orderId = $scope.getActiveOrder();

                menucard.removeDishFromOrder(orderId, dishId, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();