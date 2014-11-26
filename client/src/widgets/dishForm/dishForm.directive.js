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
	}
})();