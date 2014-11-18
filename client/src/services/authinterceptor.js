(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($q, $window, $injector) {
		return {
			request: function(config) {
				if($window.sessionStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}
				return config;
			},
			responseError: function(response) {
				if(response.status === 401 || response.status === 403) {
					$injector.get('$state').go('dashboard.login');
					delete $window.sessionStorage.token;
				}
				return $q.reject(response);
			}
		};
	}
})();