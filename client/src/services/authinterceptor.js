(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($location, $q, $window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.sessionStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}
				return config;
			},
			response: function (response) {
				if (response.status === 401) {
					delete $window.sessionStorage.token;
					//return $q.reject(response);
				} else {
					//return $q.reject(response);
				}
				return response || $q.when(response);
			}
		};
	}
})();