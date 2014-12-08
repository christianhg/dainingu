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
            /**
             * Activate menucard with key.
             * @param key
             * @param callback
             */
            activate: function(key, callback) {
                $http.post('/api/auth/menucard/activate', { key: key })
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
            /**
             * Validate menucard with stored token.
             * @param callback
             */
            validate: function(callback) {
                if($window.sessionStorage.menucardToken) {
                    $http.post('/api/auth/menucard/validate', {token: $window.sessionStorage.menucardToken})
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