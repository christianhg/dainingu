(function () {
	'use strict';

	angular
		.module('dainingu.cashregister')
		.config(config);

	function config ($stateProvider) {
		$stateProvider
			.state('cashregister', {
				url: '/cashregister',
				templateUrl: 'cashregister/cashregister.view.html',
				controller: 'CashRegisterController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'dainingu > cashregister',
					pageClass: 'cashregister'
				}
			});
	}
})();