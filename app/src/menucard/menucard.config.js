(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('menucard', {
				url: '/',
				templateUrl: 'menucard/menucard.html',
				controller: 'MenucardController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Menucard'
				}
			});
	}
})();