(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonBegin', orderButtonBegin);

    function orderButtonBegin() {
        var directive = {
            templateUrl: 'widgets/order/button/begin/order.button.begin.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonBeginController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonBeginController($scope, sessionsOrdersBegin) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.beginOrder = function(sessionId, orderId) {
                sessionsOrdersBegin.begin({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();