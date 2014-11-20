/**
 * Dishes Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('dishes', dishes);

	function dishes($resource) {
		return $resource('/api/dishes/:id', {id: '@id'}, {
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