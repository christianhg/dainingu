(function () {
	'use strict';

	angular
		.module('dainingu.floor')
		.controller('FloorController', FloorController);

	function FloorController($scope, auth) {
		var vm = this;

		auth.validate(function(validToken) {
			vm.loggedIn = validToken;
		});

		$scope.signOut = function() {
			auth.signout('floor.login');
		};
	}
})();