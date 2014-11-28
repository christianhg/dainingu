(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController(auth, socket) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.signOut = function() {
			auth.signout('dashboard.login');
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