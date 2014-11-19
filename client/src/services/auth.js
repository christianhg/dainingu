/**
 * Authentication Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('auth', auth);

	function auth($http, $window) {
		return {
			activateSession: function(key, callback) {
				$http.post('/auth/activateSession', { key: key })
					.success(function(data) {
						callback(data);
					});
			},
			signin: function(loginData, callback) {
				$http.post('/auth/signin', loginData)
					.success(function(data) {
						callback(data);
					});
			},
			validateToken: function(callback) {
				if($window.sessionStorage.token) {
					$http.post('/auth/validateToken', {token: $window.sessionStorage.token})
						.success(function(validToken) {
							callback(validToken);
						});
				} else {
					callback(false);
				}
			}
		};
	}
})();