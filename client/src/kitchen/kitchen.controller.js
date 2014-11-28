(function () {
	'use strict';

	angular
		.module('dainingu.kitchen')
		.controller('KitchenController', KitchenController);

	function KitchenController(auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.signOut = function() {
			auth.signout('kitchen.login');
		};
	}
})();