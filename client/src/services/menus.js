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
				method: 'POST'
			},
			'update': {
				method: 'PUT'
			},
			'delete': {
				method: 'DELETE'
			},
			'get': {
				method: 'GET'
			},
			'query': {
				method: 'GET',
				isArray: true
			}
		});
	}

})();