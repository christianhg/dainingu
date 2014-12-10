(function () {
	'use strict';

	angular
		.module('dainingu.cashregister')
		.controller('CashRegisterController', CashRegisterController);

	function CashRegisterController($scope, auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		$scope.signOut = function() {
			auth.signout('cashregister.login');
		};
	}
})();