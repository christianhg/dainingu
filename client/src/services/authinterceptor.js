(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('authInterceptor', authInterceptor);

	function authInterceptor($q, $window, $injector) {
		return {
			request: function(config) {
				//
				if($window.sessionStorage.loginToken) {
					// Modify Authorization property on the config object.
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.loginToken;
				}
				return config;
			},
			// If the inceptor throws and error
			responseError: function(response) {
				// If unauthorized or forbidden
				if(response.status === 401 || response.status === 403) {
					//$injector.get('$state').go('dashboard.login');
					// delete login token
					delete $window.sessionStorage.loginToken;
				}
				return $q.reject(response);
			}
		};
	}
})();