/**
 * SessionsOrdersComplete Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersComplete', sessionsOrdersComplete);

    function sessionsOrdersComplete($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/complete', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'complete': {
                method: 'PUT',
                isArray: false
            },
            'incomplete': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();