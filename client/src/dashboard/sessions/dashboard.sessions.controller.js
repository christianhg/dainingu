(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsController', DashboardSessionsController);

    function DashboardSessionsController(sessions, sessionsOrders, sessionsOrdersCommit, sessionsOrdersConfirm, sessionsOrdersComplete, sessionsOrdersClose, socket) {
        var vm = this;


        vm.getSessions = function() {
            vm.sessions = sessions.query();
        };

        vm.getSessions();

        socket.on('ordersUpdated', function(data) {
            vm.getSessions();
        });

        vm.deleteOrder = function(sessionId, orderId) {
            sessionsOrders.delete({sessionId: sessionId, orderId: orderId}, function(data) {

            });
        };


        vm.deactivateSession = function(deactivatedSession) {
            deactivatedSession.active = false;

            sessions.update({'id': deactivatedSession._id}, deactivatedSession, function(session) {

            });
        };

        vm.deleteSession = function(id) {
            sessions.delete({}, {'id': id}, function(session) {
                vm.sessions = sessions.query();
            });
        };

        vm.closeSession = function(closedSession) {
            closedSession.expired = true;

            sessions.update({'id': closedSession._id}, closedSession, function(session) {

            });
        };

        vm.openSession = function(openedSession) {
            openedSession.expired = false;

            sessions.update({'id': openedSession._id}, openedSession, function(session) {

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
})();