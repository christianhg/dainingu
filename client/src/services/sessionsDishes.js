/**
 * SessionsDishes Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsDishes', sessionsDishes);

    function sessionsDishes($resource) {
        return $resource('/api/sessions/:id/dishes', {id: '@id'}, {
            'find': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST',
                isArray: true
            }
        });
    }
})();