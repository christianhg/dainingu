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

        function MenucardOrdersOrderController($scope, activeOrder, menucard) {
            var vm = this;

            vm.order = $scope.order;

            vm.commitOrder = function(orderId) {
                menucard.commitOrder(orderId, function(data) {
                    vm.resetActiveOrder();
                });
            };

            vm.returnOrder = function(orderId) {
                menucard.returnOrder(orderId, function(data) {
                    vm.resetActiveOrder();
                });
            };




            vm.activateOrder = function(orderId) {
                activeOrder.set(orderId);
            };

            vm.resetActiveOrder = function() {
                activeOrder.delete();
            };

            vm.getActiveOrder = function() {
                return activeOrder.get();
            };

            vm.orderActive = function(orderId) {
                return activeOrder.check(orderId);
            };

            /*



             vm.removeDishFromOrder = function(orderId, dishId) {
             authMenucard.getSessionId(function(sessionId) {
             sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
             console.log(data);
             });
             });
             };*/
        }

        return directive;
    }
})();