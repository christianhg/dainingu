(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonReturn', orderButtonReturn);

    function orderButtonReturn() {
        var directive = {
            templateUrl: 'widgets/order/button/return/order.button.return.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonReturnController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonReturnController($scope, sessionsOrdersServe) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.returnOrder = function(sessionId, orderId) {
                sessionsOrdersServe.return({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();