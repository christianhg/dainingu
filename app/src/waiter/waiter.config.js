(function () {
	'use strict';

	angular
		.module('dainingu.waiter')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('waiter', {
				url: '/waiter',
				templateUrl: 'waiter/waiter.view.html',
				controller: 'WaiterController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Waiter'
				}
			});
	}
})();