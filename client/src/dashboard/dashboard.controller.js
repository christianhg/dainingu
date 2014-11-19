(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController(auth, $state, $window) {
		var vm = this;

		auth.validateLoginToken(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.dashboardLogout = function() {
			//socket.disconnect();
			delete $window.sessionStorage.loginToken;
			$state.go('dashboard.login', null, { reload: true });
		};
	}
})();