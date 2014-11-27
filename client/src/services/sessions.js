/**
 * Sessions Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('sessions', sessions);

	function sessions($resource) {
		return $resource('/api/sessions/:id', { id: '@id' }, {
			'get': {
				method: 'GET',
				isArray: false
			},
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
			}
		});
	}
})();