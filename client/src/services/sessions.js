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