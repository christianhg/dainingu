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
				} else if($window.sessionStorage.menucardToken) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.menucardToken;
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
					delete $window.sessionStorage.menucardToken;
				}
				return $q.reject(response);
			}
		};
	}
})();