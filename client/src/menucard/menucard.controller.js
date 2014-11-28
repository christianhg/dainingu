(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(activeOrder, authMenucard, sessions, socket) {
		var vm = this;

		vm.activateMenucard = function() {
			authMenucard.validate(function(validToken) {
				vm.menucardActivated = validToken;
				if(validToken) {
					vm.getSessionInfo();
					vm.getActiveOrder();
				} else {
					activeOrder.delete();
				}

			});
		};

		vm.activateMenucard();

		vm.getSessionInfo = function() {
			authMenucard.getSessionId(function(sessionId) {
				if(sessionId) {
					sessions.get({id: sessionId}, function(session) {
						vm.session = session;
					});
				} else {
					vm.session = {};
				}
			});
		};

		vm.getActiveOrder = function() {
			return activeOrder.get();
		};

		socket.on('sessionsUpdated', function() {
			vm.activateMenucard();
		});
	}
})();