(function () {
	'use strict';

	angular
		.module('dainingu.menucard.menus')
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('menucard.menus', {
				url: '/menus',
				templateUrl: 'menucard/menus/menucard.menus.view.html',
				controller: 'MenucardMenusController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > menucard > menuer'
				}
			});
	}
})();