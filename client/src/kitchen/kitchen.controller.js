(function () {
	'use strict';

	angular
		.module('dainingu.kitchen')
		.controller('KitchenController', KitchenController);

	function KitchenController($scope, auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		$scope.signOut = function() {
			auth.signout('kitchen.login');
		};
	}
})();