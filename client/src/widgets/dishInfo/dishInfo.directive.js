(function () {
	'use strict';

	angular
		.module('dainingu.widgets')
		.directive('dishInfo', dishInfo);

	function dishInfo() {
		var directive = {
			templateUrl: 'widgets/dishInfo/dishInfo.view.html',
			restrict: 'E',
			scope: {
				dish: '='
			},
			controller: DishInfoController,
			controllerAs: 'vm'
		};

		return directive;

		/**
		 * @ngInject
		 */
		function DishInfoController($scope) {
			var vm = this;

			vm.dish = {};

			$scope.$watch("dish",function(newValue,OldValue,scope){
				if (newValue){
					vm.dish = newValue;
				}
			});
		}
		/*function DishFormController($scope) {
		 var vm = this;

		 vm.dish = {};


		 }*/
	}
})();