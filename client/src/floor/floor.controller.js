(function () {
	'use strict';

	angular
		.module('dainingu.floor')
		.controller('FloorController', FloorController);

	function FloorController(auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.signOut = function() {
			auth.signout('floor.login');
		};
	}
})();