(function() {
	'use strict';

	angular
		.module('dainingu.core')
		.config(config)
		.run(run);

	function config($urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/');
	}

	function run() {

	}

})();