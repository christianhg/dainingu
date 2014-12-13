(function () {
	'use strict';

	angular
		.module('dainingu.floor')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('floor', {
				url: '/floor',
				templateUrl: 'floor/floor.view.html',
				controller: 'FloorController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > floor',
					pageClass: 'floor'
				}
			});
	}
})();