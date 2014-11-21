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

		menus.query(function(menus) {
			angular.forEach(menus, function(menu) {
				menusDishes.find({id: menu.id}, function(dishes) {
					menu.dishes = dishes;
					vm.menus.push(menu);
				});
			});
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