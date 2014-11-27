(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController($state, $window, auth, socket) {
		var vm = this;

		auth.validateLoginToken(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.dashboardLogout = function() {
			delete $window.sessionStorage.loginToken;
			$state.go('dashboard.login', null, { reload: true });
		};


		socket.on('alert', function(alert) {
			vm.alerts.push(alert);
		});

		vm.alerts = [];

		vm.closeAlert = function(index) {
			vm.alerts.splice(index, 1);
		};
	}
})();