(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController($state, $window, socket) {
		var vm = this;

		vm.dashboardLogout = function() {
			//socket.disconnect();
			delete $window.sessionStorage.loginToken;
			$state.go('dashboard.login');
		};
	}
})();