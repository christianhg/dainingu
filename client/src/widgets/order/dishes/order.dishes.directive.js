(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderDishes', orderDishes);

    function orderDishes() {
        var directive = {
            templateUrl: 'widgets/order/dishes/order.dishes.view.html',
            restrict: 'E',
            scope: {
                order: '='
            },
            controller: OrderDishesController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderDishesController($scope, sessionsOrders, sessionsOrdersCommit, sessionsOrdersConfirm, sessionsOrdersComplete, sessionsOrdersClose, sessionsOrdersDishes, socket) {
            var vm = this;

            vm.order = $scope.order;


        }
    }
})();