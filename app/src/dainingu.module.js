(function () {
	'use strict';

	angular
		.module('dainingu', [
			/**
			 * Core module
			 */
			'dainingu.core',
			/**
			 * Components
			 */
			'dainingu.cashregister',
			'dainingu.dashboard',
			'dainingu.home',
			'dainingu.kitchen',
			'dainingu.menucard',
			'dainingu.templates',
			'dainingu.waiter',
		]);
})();