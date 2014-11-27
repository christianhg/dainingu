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
				dish: '=',
				menu: '='
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

			vm.menu = false;

			$scope.$watch("dish",function(newValue){
				if (newValue){
					vm.dish = newValue;
				}
			});

			$scope.$watch("menu",function(newValue){
				if (newValue){
					vm.menu = newValue;
				}
			});
		}
	}
})();