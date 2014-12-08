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

		function MenucardMenusController(activeOrder, menucard, menus, socket) {
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

			vm.getActiveOrder = function() {
				return activeOrder.get();
			};

			vm.addDishToOrder = function(dish) {
				var orderId = vm.getActiveOrder();
				menucard.addDishToOrder(orderId, dish, function() {

				});
			};
		}

		return directive;
	}
})();