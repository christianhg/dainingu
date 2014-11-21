/**
 * MenusDishes Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('menusDishes', menusDishes);

	function menusDishes($resource) {
		return $resource('/api/menus/:menuId/dishes/:dishId', {menuId: '@menuId', dishId: '@dishId'}, {
			'find': {
				method: 'GET',
				isArray: true
			},
			'save': {
				method: 'POST',
				isArray: true
			},
			'delete': {
				method: 'DELETE',
				isArray: false
			}
		});
	}
})();