(function () {
	'use strict';

	angular
		.module('dainingu.kitchen')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('kitchen', {
				url: '/kitchen',
				templateUrl: 'kitchen/kitchen.view.html',
				controller: 'KitchenController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > kitchen'
				}
			});
	}
})();