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
		return $resource('/api/menus/:id/dishes', {id: '@id'}, {
			'find': {
				method: 'GET',
				isArray: true
			}
		});
	}
})();