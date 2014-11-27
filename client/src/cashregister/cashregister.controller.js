(function () {
	'use strict';

	angular
		.module('dainingu.cashregister')
		.controller('CashRegisterController', CashRegisterController);

	function CashRegisterController($state, $window, auth) {
		var vm = this;

		auth.validateLoginToken(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.cashregisterLogout = function() {
			delete $window.sessionStorage.loginToken;
			$state.go('cashregister.login', null, { reload: true });
		};
	}
})();