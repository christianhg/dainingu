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
			 * Home module
			 */
			'dainingu.home',

			/**
			 * Feature areas
			 */
			'dainingu.cashregister',
			'dainingu.dashboard',
			'dainingu.floor',
			'dainingu.kitchen',
			'dainingu.menucard',

			/**
			 * Widgets
			 */
			'dainingu.widgets',

			/**
			 * Misc
			 */
			'dainingu.templates'
		]);
})();