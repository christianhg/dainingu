(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(auth, socket) {
		var vm = this;

		vm.activateMenucard = function() {
			auth.validateMenucardToken(function(validToken) {
				vm.menucardActivated = validToken;
			});
		};

		vm.activateMenucard();

		socket.on('sessionsUpdated', function() {
			vm.activateMenucard();
		});
	}
})();