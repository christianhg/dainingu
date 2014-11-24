/**
 * SessionsOrdersClose Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersClose', sessionsOrdersClose);

    function sessionsOrdersClose($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/close', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'close': {
                method: 'PUT',
                isArray: false
            },
            'open': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();