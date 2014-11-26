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
			'btford.socket-io',
			'ui.bootstrap',
			'ui.router'
		]);
})();