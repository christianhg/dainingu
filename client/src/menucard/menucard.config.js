(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('menucard', {
				url: '/menucard',
				templateUrl: 'menucard/menucard.view.html',
				controller: 'MenucardController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > menukort'
				}
			});
	}
})();