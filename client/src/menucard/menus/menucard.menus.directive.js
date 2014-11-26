(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.directive('menus', menus);

	function menus() {
		var directive = {
			templateUrl: 'menucard/menus/menucard.menus.view.html',
			restrict: 'E',
			scope: {

			},
			controller: MenucardMenusController,
			controllerAs: 'vm'
		};

		function MenucardMenusController($window, auth, menus, sessionsOrdersDishes, socket) {
			var vm = this;

			vm.getMenus = function() {
				menus.index({deep: true}, function(menus) {
					vm.menus = menus;
				});
			};

			vm.getMenus();

			vm.activateMenucard = function() {
				auth.validateMenucardToken(function(validToken) {
					vm.menucardActivated = validToken;
				});
			};

			vm.activateMenucard();

			socket.on('sessionsUpdated', function() {
				vm.activateMenucard();
			});

			vm.addDishToOrder = function(dish) {
				var orderId = $window.sessionStorage.activeOrder;
				auth.getSessionId(function(sessionId) {
					if(sessionId && orderId) {
						sessionsOrdersDishes.save({sessionId: sessionId, orderId: orderId}, dish, function() {

						});
					}
				});
			};
		}

		return directive;
	}
})();