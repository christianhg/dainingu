(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonIncomplete', orderButtonIncomplete);

    function orderButtonIncomplete() {
        var directive = {
            templateUrl: 'widgets/order/button/incomplete/order.button.incomplete.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonIncompleteController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonIncompleteController($scope, sessionsOrdersComplete) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.incompleteOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();