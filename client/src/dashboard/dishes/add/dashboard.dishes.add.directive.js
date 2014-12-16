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
		function AddDishController($scope, dishes, menus) {
			var vm = this;

			$scope.addDish = function(dish) {
				dishes.save(dish, function(data) {
					console.log(data);
					// reset form
					vm.dish = {};
				});
			};

			vm.getMenus = function() {
				menus.query(function(menus) {
					vm.menus = menus;
				});
			};

			vm.getMenus();
		}
	}
})();