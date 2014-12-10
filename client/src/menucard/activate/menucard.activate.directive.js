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
		function ActivateMenucardController($scope, authMenucard) {
			var vm = this;

			$scope.activateMenucard = function(key) {
				authMenucard.activate(key, function(data) {
					vm.session = {};
					console.log(data);
				});
			};
		}
	}
})();