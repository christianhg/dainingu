(function () {
	'use strict';

	angular
		.module('dainingu.home')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'components/home/home.view.html',
				controller: 'HomeController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Home'
				}
			});
	}
})();