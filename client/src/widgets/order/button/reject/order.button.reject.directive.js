(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('orderButtonReject', orderButtonReject);

    function orderButtonReject() {
        var directive = {
            templateUrl: 'widgets/order/button/reject/order.button.reject.view.html',
            restrict: 'E',
            scope: {
                orderId: '=',
                sessionId: '='
            },
            controller: OrderButtonRejectController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function OrderButtonRejectController($scope, sessionsOrdersConfirm) {
            var vm = this;

            vm.order = {};
            vm.order._id = $scope.orderId;
            vm.session = {};
            vm.session._id = $scope.sessionId;

            $scope.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }
    }
})();