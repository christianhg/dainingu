(function () {
	'use strict';

	angular
		.module('dainingu', [
			/**
			 * Core modules
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