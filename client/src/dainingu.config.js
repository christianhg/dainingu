(function () {
	'use strict';

	angular
		.module('dainingu')
		.config(config)
		.run(runBlock);


	function config($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}

	function runBlock() {

	}
})();