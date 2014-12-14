(function() {
	'use strict';

	angular
		.module('dainingu.core')
		.config(config);

	function config($httpProvider, $urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/');

		$httpProvider.interceptors.push('authInterceptor');
	}
})();