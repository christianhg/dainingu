(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .directive('dashboardSession', dashboardSession);

    function dashboardSession() {
        var directive = {
            templateUrl: 'dashboard/sessions/session/dashboard.sessions.session.view.html',
            restrict: 'E',
            scope: {
                session: '='
            },
            controller: DashboardSessionsSessionController,
            controllerAs: 'vm'
        };

        function DashboardSessionsSessionController($scope, sessionsActivate, sessionsExpire, sessionsOrders, sessionsOrdersCommit, sessionsOrdersConfirm, sessionsOrdersComplete, sessionsOrdersClose, sessionsOrdersDishes) {
            var vm = this;

            vm.session = $scope.session;


            vm.activateSession = function(sessionId) {
                sessionsActivate.activate({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.deactivateSession = function(sessionId) {
                sessionsActivate.deactivate({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.expireSession = function(sessionId) {
                sessionsExpire.expire({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.resumeSession = function(sessionId) {
                sessionsExpire.resume({sessionId: sessionId}, function(data) {
                    console.log(data);
                });
            };

            vm.deleteSession = function(id) {
                sessions.delete({}, {'id': id}, function(data) {
                    console.log(data);
                });
            };

            vm.deleteOrder = function(sessionId, orderId) {
                sessionsOrders.delete({sessionId: sessionId, orderId: orderId}, function(data) {

                });
            };

            vm.removeDishFromOrder = function(sessionId, orderId, dishId) {
                sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
                    console.log(data);
                });
            };

            vm.commitOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.pullOrder = function(sessionId, orderId) {
                sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.confirmOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.confirm({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.rejectOrder = function(sessionId, orderId) {
                sessionsOrdersConfirm.reject({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.completeOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.complete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.incompleteOrder = function(sessionId, orderId) {
                sessionsOrdersComplete.incomplete({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.closeOrder = function(sessionId, orderId) {
                sessionsOrdersClose.close({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };

            vm.openOrder = function(sessionId, orderId) {
                sessionsOrdersClose.open({sessionId: sessionId, orderId: orderId}, function(data) {
                    console.log(data);
                });
            };
        }

        return directive;
    }
})();