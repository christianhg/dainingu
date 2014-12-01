/**
 * DishesActivate Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('dishesActivate', dishesActivate);

    function dishesActivate($resource) {
        return $resource('/api/dishes/:dishId/activate', {dishId: '@dishId'}, {
            'activate': {
                method: 'PUT',
                isArray: false
            },
            'deactivate': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();