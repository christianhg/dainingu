(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('orders', orders);

	function orders() {
		var directive = {
			templateUrl: 'menucard/orders/menucard.orders.view.html',
			restrict: 'E',
			scope: {

			},
			controller: MenucardOrdersController,
			controllerAs: 'vm'
		};

		function MenucardOrdersController(auth, sessionsOrders, socket, sessionsOrdersCommit, sessionsOrdersDishes) {
			var vm = this;

			vm.getOrders = function() {
				auth.getSessionId(function(sessionId) {
					if(sessionId) {
						sessionsOrders.index({sessionId: sessionId}, function(orders) {
							vm.orders = orders;
						});
					}
				});
			};

			vm.getOrders();

			socket.on('ordersUpdated', function() {
				vm.getOrders();
			});

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

			vm.activateOrder = function(orderId) {
				$window.sessionStorage.activeOrder = orderId;
			}
		}

		return directive;
	}
})();