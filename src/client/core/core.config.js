(function() {
	'use strict';

	angular
		.module('dainingu.core')
		.config(config);

	/** @ngInject */
	function config($urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/');
	}

})();