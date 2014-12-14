(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonCommit', orderButtonCommit);

    function orderButtonCommit() {
        var directive = {
            templateUrl: 'widgets/order/button/commit/order.button.commit.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonCommitController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonCommitController($scope, sessionsOrdersCommit) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.commitOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();