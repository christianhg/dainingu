(function () {
	'use strict';

	angular
		.module('dainingu')
		.filter('menuName', menuName);

	function menuName(menus) {
		return function(menuId) {

			var hej = '';

			if(menuId) {
				menus.get({id: menuId}, function(menu) {
					hej = menu.name;
				});
			}

			return hej;
		};
	}
})();