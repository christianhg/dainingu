(function () {
	'use strict';

	angular
		.module('dainingu.kitchen')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('kitchen', {
				url: '/kitchen',
				templateUrl: 'components/kitchen/kitchen.view.html',
				controller: 'KitchenController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Kitchen'
				}
			});
	}
})();