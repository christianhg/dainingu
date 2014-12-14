(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonComplete', orderButtonComplete);

    function orderButtonComplete() {
        var directive = {
            templateUrl: 'widgets/order/button/complete/order.button.complete.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonCompleteController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonCompleteController($scope, sessionsOrdersComplete) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.completeOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();