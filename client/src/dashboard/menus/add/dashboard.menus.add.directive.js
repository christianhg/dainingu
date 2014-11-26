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

			vm.addMenu = function(newMenu) {
				menus.save(newMenu, function(data) {
					console.log(data);
				});
			};
		}
	}
})();