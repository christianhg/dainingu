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

		function MenucardMenusController($window, authMenucard, menus, sessionsOrdersDishes, socket) {
			var vm = this;

			vm.getMenus = function() {
				menus.index({deep: true}, function(menus) {
					vm.menus = menus;
				});
			};

			vm.getMenus();

			socket.on('menusUpdated', function() {
				vm.getMenus();
			});

			socket.on('dishesUpdated', function() {
				vm.getMenus();
			});

			vm.activateMenucard = function() {
				authMenucard.validate(function(validToken) {
					vm.menucardActivated = validToken;
				});
			};

			vm.activateMenucard();

			vm.getActiveOrder = function() {
				if($window.sessionStorage.activeOrder) {
					return $window.sessionStorage.activeOrder;
				} else {
					return false;
				}
			};

			socket.on('sessionsUpdated', function() {
				vm.activateMenucard();
			});

			vm.addDishToOrder = function(dish) {
				var orderId = vm.getActiveOrder();

				if(orderId) {
					auth.getSessionId(function(sessionId) {
						if(sessionId && orderId) {
							sessionsOrdersDishes.save({sessionId: sessionId, orderId: orderId}, dish, function() {

							});
						}
					});
				}

			};
		}

		return directive;
	}
})();