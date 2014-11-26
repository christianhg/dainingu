(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('activateMenucard', activateMenucard);

	function activateMenucard() {
		var directive = {
			templateUrl: 'menucard/activate/menucard.activate.view.html',
			restrict: 'E',
			scope: {
			},
			controller: ActivateMenucardController,
			controllerAs: 'vm'
		};

		return directive;

		/**
		 * @ngInject
		 */
		function ActivateMenucardController(auth) {
			var vm = this;

			vm.activateMenucard = function(key) {
				auth.activateSession(key, function(data) {
					// If activation was successful.
					if(data.success) {
						vm.session = {};
					}
				});

			};
		}
	}
})();