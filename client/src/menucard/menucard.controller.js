(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	/**
	 * @ngInject
	 */
	function MenucardController(activeOrder, authMenucard, menucard, socket) {
		var vm = this;

		vm.validateMenucard = function() {
			authMenucard.validate(function(validToken) {
				vm.menucardActivated = validToken;
				if(validToken) {
					vm.getSession();
					vm.getActiveOrder();
				} else {
					activeOrder.delete();
				}

			});
		};

		vm.validateMenucard();

		vm.getSession = function() {
			menucard.getSession(function(session) {
				vm.session = session;
			});
		};

		vm.getActiveOrder = function() {
			return activeOrder.get();
		};

		socket.on('sessionsUpdated', function() {
			vm.validateMenucard();
		});
	}
})();