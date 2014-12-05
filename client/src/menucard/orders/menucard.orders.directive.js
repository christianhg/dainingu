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

		function MenucardOrdersController(activeOrder, authMenucard, sessionsOrders, socket, sessionsOrdersCommit, sessionsOrdersDishes, sessionsOrdersServe) {
			var vm = this;

			vm.getOrders = function() {
				authMenucard.getSessionId(function(sessionId) {
					if(sessionId) {
						sessionsOrders.index({sessionId: sessionId}, function(orders) {
							vm.orders = orders;
						});
					}
				});
			};

			vm.getOrders();

			socket.on('sessionsUpdated', function() {
				vm.getOrders();
			});

			socket.on('ordersUpdated', function() {
				vm.getOrders();
			});

			vm.commitOrder = function(orderId) {
				authMenucard.getSessionId(function(sessionId) {
					sessionsOrdersCommit.commit({sessionId: sessionId, orderId: orderId}, function(data) {
						vm.resetActiveOrder();
					});
				});
			};

			vm.pullOrder = function(orderId) {
				authMenucard.getSessionId(function(sessionId) {
					sessionsOrdersCommit.pull({sessionId: sessionId, orderId: orderId}, function(data) {
						console.log(data);
					});
				});
			};

			vm.returnOrder = function(orderId) {
				authMenucard.getSessionId(function(sessionId) {
					sessionsOrdersServe.return({sessionId: sessionId, orderId: orderId}, function(data) {

					});
				});
			};

			vm.removeDishFromOrder = function(orderId, dishId) {
				authMenucard.getSessionId(function(sessionId) {
					sessionsOrdersDishes.delete({sessionId: sessionId, orderId: orderId, dishId: dishId}, function(data) {
						console.log(data);
					});
				});
			};

			vm.activateOrder = function(orderId) {
				activeOrder.set(orderId);
			};

			vm.resetActiveOrder = function() {
				activeOrder.delete();
			};

			vm.getActiveOrder = function() {
				return activeOrder.get();
			};

			vm.orderActive = function(orderId) {
				return activeOrder.check(orderId);
			};
		}

		return directive;
	}
})();