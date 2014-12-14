(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonPull', orderButtonPull);

    function orderButtonPull() {
        var directive = {
            templateUrl: 'widgets/order/button/pull/order.button.pull.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonPullController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonPullController($scope, sessionsOrdersCommit) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.pullOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();