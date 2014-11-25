/**
 * SessionsOrdersDishes Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersDishes', sessionsOrdersDishes);

    function sessionsOrdersDishes($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/dishes/:dishId', {sessionId: '@sessionId', orderId: '@orderId', dishId: '@dishId'}, {
            'find': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST',
                isArray: false
            },
            'delete': {
                method: 'DELETE',
                isArray: true
            }
        });
    }
})();