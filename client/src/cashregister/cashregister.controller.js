(function () {
	'use strict';

	angular
		.module('dainingu.cashregister')
		.controller('CashRegisterController', CashRegisterController);

	function CashRegisterController(auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.signOut = function() {
			auth.signout('cashregister.login');
		};
	}
})();