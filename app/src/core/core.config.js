(function() {
	'use strict';

	angular
		.module('dainingu.core')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/');
		$stateProvider
			.state('index', {
				url: '/',
				templateUrl: 'components/home/home.html',
				controller: 'HomeController',
				controllerAs: 'vm'
			})
			.state('waiter', {
				url: 'waiter',
				templateUrl: 'components/waiter/waiter.html'
			});
	}

})();