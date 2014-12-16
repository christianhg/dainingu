(function () {
	'use strict';

	angular
		.module('dainingu.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController($scope, auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		$scope.signOut = function() {
			auth.signout('dashboard.login');
		};
	}
})();