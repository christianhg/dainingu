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

		function MenucardOrdersController(menucard, socket) {
			var vm = this;

			vm.getOrders = function() {
				menucard.getOrders(function(orders) {
					vm.orders = orders;
				});
			};

			vm.getOrders();

			socket.on('sessionsUpdated', function() {
				vm.getOrders();
			});

			socket.on('ordersUpdated', function() {
				vm.getOrders();
			});

		}

		return directive;
	}
})();