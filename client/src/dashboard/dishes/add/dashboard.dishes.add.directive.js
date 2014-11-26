(function () {
	'use strict';

	angular
		.module('dainingu.dashboard.dishes')
		.directive('addDish', addDish);

	function addDish() {
		var directive = {
			templateUrl: 'dashboard/dishes/add/dashboard.dishes.add.view.html',
			restrict: 'E',
			scope: {
			},
			controller: AddDishController,
			controllerAs: 'vm'
		};

		return directive;

		/**
		 * @ngInject
		 */
		function AddDishController(dishes, menus) {
			var vm = this;

			vm.addDish = function(dish) {
				dishes.save(dish, function() {
					// reset form
					vm.dish = {};
				});
			};

			menus.query(function(menus) {
				vm.menus = menus;
			});
		}
	}
})();