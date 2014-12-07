(function () {
	'use strict';

	angular
		.module('dainingu.widgets')
		.directive('dishForm', dishForm);

	function dishForm() {
		var directive = {
			templateUrl: 'widgets/dish/form/dish.form.view.html',
			restrict: 'E'
		};

		return directive;
	}
})();