/**
 * Menus Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('menus', menus);

	function menus($resource) {
		return $resource('/api/menus/:id', { id: '@id' }, {
			'save': {
				method: 'POST',
				isArray: false
			},
			'update': {
				method: 'PUT',
				isArray: false
			},
			'delete': {
				method: 'DELETE',
				isArray: false
			},
			'get': {
				method: 'GET',
				isArray: false
			},
			'index': {
				method: 'GET',
				isArray: true
			}
		});
	}

})();