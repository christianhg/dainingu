/**
 * SessionsOrders Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrders', sessionsOrders);

    function sessionsOrders($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'find': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST',
                isArray: false
            }
        });
    }
})();