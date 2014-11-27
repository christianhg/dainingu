(function () {
	'use strict';

	angular
		.module('dainingu.floor')
		.controller('FloorController', FloorController);

	function FloorController($state, $window, auth) {
		var vm = this;

		auth.validateLoginToken(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.floorLogout = function() {
			delete $window.sessionStorage.loginToken;
			$state.go('floor.login', null, { reload: true });
		};
	}
})();