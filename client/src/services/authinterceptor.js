(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($q, $window, $injector) {
		return {
			request: function(config) {
				if($window.sessionStorage.loginToken) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.loginToken;
				}
				return config;
			},
			responseError: function(response) {
				if(response.status === 401 || response.status === 403) {
					$injector.get('$state').go('dashboard.login');
					delete $window.sessionStorage.loginToken;
				}
				return $q.reject(response);
			}
		};
	}
})();