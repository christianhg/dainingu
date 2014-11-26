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

		function MenucardOrdersController(auth, sessionsOrders, socket) {
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
		}

		return directive;
	}
})();