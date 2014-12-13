(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'dashboard/dashboard.view.html',
				controller: 'DashboardController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > dashboard',
					pageClass: 'dashboard'
				}
			});
	}
})();