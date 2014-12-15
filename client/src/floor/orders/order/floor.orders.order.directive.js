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
        function FloorOrdersOrderController($scope) {
            var vm = this;

            vm.order = $scope.order;
            vm.session = $scope.session;
        }

        return directive;
    }
})();