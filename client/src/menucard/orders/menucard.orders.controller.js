(function () {
    'use strict';

    angular
        .module('dainingu.menucard.orders')
        .controller('MenucardOrdersController', MenucardOrdersController);

    function MenucardOrdersController(auth, menus, menusDishes, sessionsOrders, sessionsOrdersFinish, sessionsOrdersDishes, $window, socket) {
        var vm = this;



        vm.getOrders = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.find({sessionId: sessionId}, function(orders) {
                    vm.orders = orders;
                });
            });
        };

        vm.getOrders();


        socket.on('orderUpdated', function(data) {
            vm.getOrders();
        });

        vm.addOrder = function() {
            auth.getSessionId(function(sessionId) {
                sessionsOrders.save({sessionId: sessionId}, {}, function(orders) {
                    vm.orders = orders;
                });
            });
        };

        vm.finishOrder = function(orderId) {
            auth.getSessionId(function(sessionId) {
                sessionsOrdersFinish.finish({sessionId: sessionId, orderId: orderId}, function(orders) {
                    console.log(orders);
                });
            })
        };

        vm.unFinishOrder = function(orderId) {
            auth.getSessionId(function(sessionId) {
                sessionsOrdersFinish.unFinish({sessionId: sessionId, orderId: orderId}, function(orders) {
                    console.log(orders);
                });
            })
        };

        vm.removeDishFromOrder = function(orderId, dishId) {
            auth.getSessionId(function(sessionId) {
                sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
                    console.log(data);
                });
            })
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