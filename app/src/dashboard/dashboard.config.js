(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm',
				title: 'Dashboard'
			});
	}
})();