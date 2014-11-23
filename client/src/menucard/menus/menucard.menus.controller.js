(function () {
	'use strict';

	angular
		.module('dainingu.menucard.menus')
		.controller('MenucardMenusController', MenucardController);

	function MenucardController(auth, menus, menusDishes, sessionsOrders, sessionsOrdersDishes, sessionsDishes, $window, socket) {
		var vm = this;

		auth.validateMenucardToken(function(validToken) {
			vm.menucardActivated = validToken;
		});

		auth.getSessionId(function(sessionId) {
			sessionsOrders.find({sessionId: sessionId}, function(orders) {
				vm.orders = orders;
			});
		});

		vm.menus = [];

		menus.query({deep: true}, function(menus) {
			vm.menus = menus;
		});

		vm.addDishToOrder = function(dish) {
			auth.getSessionId(function(sessionId) {
				sessionsOrdersDishes.save({sessionId: sessionId, orderId: vm.activeOrder}, dish, function(data) {
					console.log(data);
				});
			});
		};

		vm.addDishToSession = function(dish) {
			var token = $window.sessionStorage.menucardToken;

			auth.getSessionId(function(sessionId) {
				sessionsDishes.save({'id': sessionId}, {dish: dish, token: token}, function(dish) {

				});
			});
		};

		socket.on('menuAdded', function(data) {
			console.log(data.message);
		});

		socket.on('menuUpdated', function(data) {
			console.log(data.message);
		});

		socket.on('menuDeleted', function(data) {
			console.log(data.message);
		});
	}
})();