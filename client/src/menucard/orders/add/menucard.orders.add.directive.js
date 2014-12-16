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

		/**
		 * @ngInject
		 */
		function MenucardOrdersAddController($scope, menucard, activeOrder) {
			var vm = this;

			$scope.addOrder = function() {
				menucard.addOrder(function(data) {
					console.log(data);
					activeOrder.set(data.order._id);
				});
			};
		}

		return directive;
	}
})();