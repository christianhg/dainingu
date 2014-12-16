(function () {
	'use strict';

	angular
		.module('dainingu.dashboard.menus')
		.directive('addMenu', addMenu);

	function addMenu() {
		var directive = {
			templateUrl: 'dashboard/menus/add/dashboard.menus.add.view.html',
			restrict: 'E',
			scope: {
			},
			controller: AddMenuController,
			controllerAs: 'vm'
		};

		return directive;

		/**
		 * @ngInject
		 */
		function AddMenuController($scope, menus) {
			var vm = this;

			$scope.addMenu = function() {
				menus.save(vm.menu, function(data) {
					console.log(data);
					// reset form
					vm.menu = {};
				});
			};
		}
	}
})();