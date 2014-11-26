(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(activeOrder, auth, socket) {
		var vm = this;

		vm.activateMenucard = function() {
			auth.validateMenucardToken(function(validToken) {
				vm.menucardActivated = validToken;
			});
		};

		vm.activateMenucard();

		vm.getActiveOrder = function() {
			return activeOrder.get();
		};

		socket.on('sessionsUpdated', function() {
			vm.activateMenucard();
		});
	}
})();