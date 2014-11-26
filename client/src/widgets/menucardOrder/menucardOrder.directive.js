(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('menucardOrder', menucardOrder);

    function menucardOrder() {
        var directive = {
            templateUrl: 'widgets/menucardOrder/menucardOrder.view.html',
            restrict: 'E',
            scope: {
                order: '='
            },
            controller: MenucardOrderController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function MenucardOrderController($scope, auth, sessionsOrdersCommit, sessionsOrdersDishes) {
            var vm = this;

            vm.order = $scope.order;

            vm.commitOrder = function(orderId) {
                auth.getSessionId(function(sessionId) {
                    sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(orders) {
                        console.log(orders);
                    });
                });
            };

            vm.pullOrder = function(orderId) {
                auth.getSessionId(function(sessionId) {
                    sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(orders) {
                        console.log(orders);
                    });
                });
            };

            vm.removeDishFromOrder = function(orderId, dishId) {
                auth.getSessionId(function(sessionId) {
                    sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
                        console.log(data);
                    });
                });
            };
        }
    }
})();