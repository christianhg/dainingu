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
			'ngResource',

			/**
			 * Third-party modules
			 */
			'btford.socket-io',
			'ui.router'
		]);
})();