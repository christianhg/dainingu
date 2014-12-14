(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonConfirm', orderButtonConfirm);

    function orderButtonConfirm() {
        var directive = {
            templateUrl: 'widgets/order/button/confirm/order.button.confirm.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonConfirmController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonConfirmController($scope, sessionsOrdersConfirm) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.confirmOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.confirm({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();