(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('menucardOrdersAdd', menucardOrdersAdd);

	function menucardOrdersAdd() {
		var directive = {
			templateUrl: 'menucard/orders/add/menucard.orders.add.view.html',
			restrict: 'E',
			scope: {

			},
			controller: MenucardOrdersAddController,
			controllerAs: 'vm'
		};

		function MenucardOrdersAddController($window, activeOrder, auth, sessionsOrders) {
			var vm = this;

			vm.addOrder = function() {
				auth.getSessionId(function(sessionId) {
					if(sessionId) {
						sessionsOrders.save({sessionId: sessionId}, {}, function(data) {
							activeOrder.set(data.order._id);
						});
					}
				});
			};
		}

		return directive;
	}
})();