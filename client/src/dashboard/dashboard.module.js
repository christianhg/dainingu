(function () {
	'use strict';

	angular
		.module('dainingu.dashboard', [
			'dainingu.dashboard.dishes',
			'dainingu.dashboard.login',
			'dainingu.dashboard.menus',
			'dainingu.dashboard.orders',
			'dainingu.dashboard.users',
			'dainingu.dashboard.sessions',
			'dainingu.dashboard.signup',
			'dainingu.dashboard.statistics'
		]);
})();