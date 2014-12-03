(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController(auth, socket) {
		var vm = this;

		vm.alerts = [];
		vm.user = auth.userInfo();

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.signOut = function() {
			auth.signout('dashboard.login');
		};

		socket.on('alert', function(alert) {
			// push new alert to alert array
			vm.alerts.push(alert);
		});

		vm.closeAlert = function(index) {
			// remove alert from alert array
			vm.alerts.splice(index, 1);
		};
	}
})();