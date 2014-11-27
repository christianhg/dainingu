(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(activeOrder, auth, sessions, socket) {
		var vm = this;

		vm.activateMenucard = function() {
			auth.validateMenucardToken(function(validToken) {
				vm.menucardActivated = validToken;
			});
		};

		vm.activateMenucard();

		vm.getSessionInfo = function() {
			auth.getSessionId(function(sessionId) {
				if(sessionId) {
					sessions.get({id: sessionId}, function(session) {
						vm.session = session;
					});
				}
			});
		};

		vm.getSessionInfo();

		vm.getActiveOrder = function() {
			return activeOrder.get();
		};

		socket.on('sessionsUpdated', function() {
			vm.activateMenucard();
			vm.getSessionInfo();
		});
	}
})();