(function() {
	'use strict';

	/**
	 * Cross app modules
	 */
	angular
		.module('dainingu.core', [
			/**
			 * Angular modules
			 */
			'ngAnimate',
			'ngResource',
			'ngTouch',

			/**
			 * Third-party modules
			 */
			'angular.filter',
			'btford.socket-io',
			'ui.bootstrap',
			'ui.router'
		]);
})();