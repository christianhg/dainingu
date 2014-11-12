(function () {
	'use strict';

	/**
	 * Main app module
	 */
	angular
		.module('dainingu', [
			/**
			 * Core module
			 */
			'dainingu.core',

			/**
			 * Feature areas
			 */
			'dainingu.cashregister',
			'dainingu.dashboard',
			'dainingu.home',
			'dainingu.kitchen',
			'dainingu.menucard',
			'dainingu.floor',

			/**
			 * Widgets
			 */
			'dainingu.widgets',

			/**
			 * Misc
			 */
			'dainingu.templates',
		]);
})();