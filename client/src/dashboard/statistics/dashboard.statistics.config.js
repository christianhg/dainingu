(function () {
	'use strict';

	angular
		.module('dainingu.dashboard.statistics')
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('dashboard.statistics', {
				url: '/statistics',
				templateUrl: 'dashboard/statistics/dashboard.statistics.view.html',
				controller: 'DashboardStatisticsController',
				controllerAs: 'vm',
				data: {
					restricted: true,
					pageTitle: 'Dashboard > Statistik'
				}
			});
	}
})();