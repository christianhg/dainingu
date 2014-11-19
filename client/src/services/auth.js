/**
 * Authentication Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('auth', auth);

	function auth($http, socket, $window) {
		return {
			activateSession: function(key, callback) {
				$http.post('/auth/activateSession', { key: key })
					.success(function(data) {
						if(data.success) {
							// Get generated JWT token and store token in sessionStorage.
							$window.sessionStorage.menucardToken = data.token;
						} else {
							// Delete token from sessionStorage.
							delete $window.sessionStorage.menucardToken;
						}
						callback(data);
					})
					.error(function(data) {
						callback(data);
					});
			},
			signin: function(loginData, callback) {
				$http.post('/auth/signin', loginData)
					.success(function(data) {
						if(data.success) {
							// Get generated JWT token and store token in sessionStorage.
							$window.sessionStorage.loginToken = data.token;
							// Initiate socket
							socket.init();
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
			validateLoginToken: function(callback) {
				if($window.sessionStorage.loginToken) {
					$http.post('/auth/validateLoginToken', {token: $window.sessionStorage.loginToken})
						.success(function(validLoginToken) {
							callback(validLoginToken);
						})
						.error(function(validLoginToken) {
							callback(false);
						});
				} else {
					callback(false);
				}
			}
		};
	}
})();