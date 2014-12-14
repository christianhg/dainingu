(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonStop', orderButtonStop);

    function orderButtonStop() {
        var directive = {
            templateUrl: 'widgets/order/button/stop/order.button.stop.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonStopController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonStopController($scope, sessionsOrdersBegin) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.stopOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.stop({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();