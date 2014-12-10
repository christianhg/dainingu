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

		/**
		 * @ngInject
		 */
		function MenucardMenusController($scope, activeOrder, menucard, menus, socket) {
			var vm = this;

			vm.getMenus = function() {
				menus.index({ deep: true }, function(menus) {
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

			$scope.getActiveOrder = function() {
				return activeOrder.get();
			};

			$scope.addDishToOrder = function(dish) {
				var orderId = $scope.getActiveOrder();

				menucard.addDishToOrder(orderId, dish, function(data) {
					console.log(data);
				});
			};
		}

		return directive;
	}
})();