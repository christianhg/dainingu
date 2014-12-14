(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonClose', orderButtonClose);

    function orderButtonClose() {
        var directive = {
            templateUrl: 'widgets/order/button/close/order.button.close.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonCloseController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonCloseController($scope, sessionsOrdersClose) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.closeOrder = function(sessionId, orderId) {
                sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();