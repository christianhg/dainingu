(function () {
	'use strict';

	angular
		.module('dainingu.widgets')
		.directive('dishForm', dishForm);

	function dishForm() {
		var directive = {
			templateUrl: 'widgets/dishForm/dishForm.view.html',
			restrict: 'E'
		};

		return directive;

		/**
		 * @ngInject
		 */
		/*function DishFormController($scope) {
			var vm = this;

			vm.dish = {};

			$scope.$watch("dish",function(newValue,OldValue,scope){
				if (newValue){
					vm.dish = newValue;
				}
			});
		}*/
	}
})();