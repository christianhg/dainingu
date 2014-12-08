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

		function MenucardOrdersAddController(menucard, activeOrder) {
			var vm = this;

			vm.addOrder = function() {
				menucard.addOrder(function(data) {
					activeOrder.set(data.order._id);
				});
			};
		}

		return directive;
	}
})();