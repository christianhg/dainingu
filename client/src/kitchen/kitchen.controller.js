(function () {
	'use strict';

	angular
		.module('dainingu.kitchen')
		.controller('KitchenController', KitchenController);

	function KitchenController($state, $window, auth) {
		var vm = this;

		auth.validateLoginToken(function(validToken) {
			vm.loggedIn = validToken;
		});

		vm.kitchenLogout = function() {
			delete $window.sessionStorage.loginToken;
			$state.go('kitchen.login', null, { reload: true });
		};
	}
})();