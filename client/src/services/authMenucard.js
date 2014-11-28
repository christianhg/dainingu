/**
 * Menucard Authentication Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('authMenucard', authMenucard);

    function authMenucard($http, $window) {
        return {
            activate: function(key, callback) {
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
            getSessionId: function(callback) {
                if($window.sessionStorage.menucardToken) {
                    $http.post('/auth/getSessionId', { token: $window.sessionStorage.menucardToken })
                        .success(function(sessionId) {
                            callback(sessionId);
                        })
                        .error(function() {
                            callback(false);
                        });
                } else {
                    callback(false);
                }
            },
            validate: function(callback) {
                if($window.sessionStorage.menucardToken) {
                    $http.post('/auth/validateMenucardToken', {token: $window.sessionStorage.menucardToken})
                        .success(function(validMenucardToken) {
                            if(!validMenucardToken) {
                                delete $window.sessionStorage.menucardToken;
                            }
                            callback(validMenucardToken);
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