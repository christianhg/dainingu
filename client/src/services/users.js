/**
 * Users Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('users', users);

	function users($resource) {
		return $resource('/api/users/:id', { id: '@id' }, {
			'save': {
				method: 'POST',
				isArray: false
			},
			'update': {
				method: 'PUT',
				isArray: true
			},
			'delete': {
				method: 'DELETE',
				isArray: true
			}
		});
	}

})();