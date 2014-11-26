(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('titleCard', titleCard);

	function titleCard() {
		var directive = {
			templateUrl: 'menucard/titleCard/menucard.titleCard.view.html',
			restrict: 'E'
		};

		return directive;
	}
})();