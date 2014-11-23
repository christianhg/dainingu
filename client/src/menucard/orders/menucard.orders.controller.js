(function () {
    'use strict';

    angular
        .module('dainingu.menucard.orders')
        .controller('MenucardOrdersController', MenucardOrdersController);

    function MenucardOrdersController(auth, menus, menusDishes, sessionsOrders, $window, socket) {
        var vm = this;

        auth.getSessionId(function(sessionId) {
            sessionsOrders.find({sessionId: sessionId}, function(orders) {
                vm.orders = orders;
            });
        });

        vm.addOrder = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.save({sessionId: sessionId}, {}, function(orders) {
                    vm.orders = orders;
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