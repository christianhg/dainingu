(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonOpen', orderButtonOpen);

    function orderButtonOpen() {
        var directive = {
            templateUrl: 'widgets/order/button/open/order.button.open.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonOpenController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonOpenController($scope, sessionsOrdersClose) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.openOrder = function(sessionId, orderId) {
                sessionsOrdersClose.open({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();