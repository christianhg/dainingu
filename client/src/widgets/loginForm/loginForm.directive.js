(function () {
	'use strict';

	angular
		.module('dainingu.widgets')
		.directive('loginForm', loginForm);

	function loginForm() {
		var directive = {
			templateUrl: 'widgets/loginForm/loginForm.view.html',
			restrict: 'E'
		};

		return directive;
	}
})();