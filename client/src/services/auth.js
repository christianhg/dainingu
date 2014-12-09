/**
 * Authentication Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('auth', auth);

	function auth($http, $state, $window) {
		return {
			userInfo: function() {
				return $window.sessionStorage.user || '';
			},
			signin: function(loginData, callback) {
				$http.post('/api/auth/signin', loginData)
					.success(function(data) {
						if(data.success) {
							$window.sessionStorage.user = data.user.username;
							// Get generated JWT token and store token in sessionStorage.
							$window.sessionStorage.loginToken = data.token;
						} else {
							// Something went wrong. Delete token from sessionStorage if it exists.
							delete $window.sessionStorage.loginToken;
						}
						callback(data);
					})
					.error(function(data) {
						callback(data);
					});
			},
			signout: function(loginState) {
				delete $window.sessionStorage.user;
				delete $window.sessionStorage.loginToken;
				$state.go(loginState, null, { reload: true });
			},
			validate: function(callback) {
				if($window.sessionStorage.loginToken) {
					$http.post('/api/auth/validate', { token: $window.sessionStorage.loginToken })
						.success(function(validLoginToken) {
							if(!validLoginToken) {
								delete $window.sessionStorage.loginToken;
							}
							callback(validLoginToken);
						})
						.error(function() {
							callback(false);
						});
				} else {
					callback(false);
				}
			}
		};
	}
})();