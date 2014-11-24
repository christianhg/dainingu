(function () {
    'use strict';

    angular
        .module('dainingu.menucard.orders')
        .controller('MenucardOrdersController', MenucardOrdersController);

    function MenucardOrdersController(auth, menus, menusDishes, sessionsOrders, sessionsOrdersCommit, sessionsOrdersDishes, $window, socket, $state) {
        var vm = this;

        vm.getOrders = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.find({sessionId: sessionId}, function(orders) {
                    vm.orders = orders;
                });
            });
        };

        vm.getOrders();

        socket.on('ordersUpdated', function(data) {
            vm.getOrders();
        });

        vm.addOrder = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.save({sessionId: sessionId}, {}, function(orders) {
                    $state.go('menucard.menus', null, {reload: true});
                });
            });
        };

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

        /*
        vm.activateMenucard = function(key) {
            auth.activateSession(key, function(data) {
                vm.activationMessage = data.message;

                // If activation was successful.
                if(data.success) {
                    //vm.activationSuccessful = true;
                    $state.go('menucard.menus', null, { refresh: true });
                } else {
                    vm.activationSuccessful = false;
                }
            });

        };*/

    }
})();