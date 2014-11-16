(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController() {
		var vm = this;

		vm.hej = 'dashboard';
	}
})();