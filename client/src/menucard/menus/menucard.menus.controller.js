(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardMenusController', MenucardController);

	function MenucardController(auth, menus, menusDishes, sessionsDishes, $window, socket) {
		var vm = this;

		auth.validateMenucardToken(function(validToken) {
			vm.menucardActivated = validToken;
		});

		vm.menus = [];

		menus.query({deep: true}, function(menus) {
			vm.menus = menus;
		});

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