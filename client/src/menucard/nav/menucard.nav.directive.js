(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('menucardNav', menucardNav);

	function menucardNav() {
		var directive = {
			templateUrl: 'menucard/nav/menucard.nav.view.html',
			restrict: 'E'
		};

		return directive;
	}
})();