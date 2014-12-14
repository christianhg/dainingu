(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonServe', orderButtonServe);

    function orderButtonServe() {
        var directive = {
            templateUrl: 'widgets/order/button/serve/order.button.serve.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonServeController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonServeController($scope, sessionsOrdersServe) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.serveOrder = function(sessionId, orderId) {
                sessionsOrdersServe.serve({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();