/**
 * SessionsOrdersConfirm Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersConfirm', sessionsOrdersConfirm);

    function sessionsOrdersConfirm($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/confirm', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'confirm': {
                method: 'PUT',
                isArray: false
            },
            'reject': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();