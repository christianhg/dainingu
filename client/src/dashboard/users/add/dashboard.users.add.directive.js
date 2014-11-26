(function () {
	'use strict';

	angular
		.module('dainingu.dashboard.users')
		.directive('addUser', addUser);

	function addUser() {
		var directive = {
			templateUrl: 'dashboard/users/add/dashboard.users.add.view.html',
			restrict: 'E',
			scope: {
			},
			controller: AddUserController,
			controllerAs: 'vm'
		};

		return directive;

		/**
		 * @ngInject
		 */
		function AddUserController(users) {
			var vm = this;

			vm.addUser = function(newUser) {
				users.save(newUser, function(user) {
					console.log(user);
				});
			};
		}
	}
})();