(function () {
    'use strict';

    angular
        .module('dainingu.menucard.orders')
        .controller('MenucardOrdersController', MenucardOrdersController);

    function MenucardOrdersController(auth, menus, sessionsOrders, socket, $state) {
        var vm = this;

        vm.getOrders = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.index({sessionId: sessionId}, function(orders) {
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