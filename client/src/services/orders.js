(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('orders', orders);

	function orders($resource) {
		return $resource('/api/orders/', {
			'get': {
				method: 'GET',
				isArray: false
			}
		});
	}
})();