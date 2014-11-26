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
		function AddMenuController(menus) {
			var vm = this;

			vm.addMenu = function() {
				menus.save(vm.menu, function(data) {
					vm.menu = {};
				});
			};
		}
	}
})();