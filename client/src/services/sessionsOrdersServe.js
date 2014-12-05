/**
 * SessionsOrdersServe Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersServe', sessionsOrdersServe);

    function sessionsOrdersServe($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/serve', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'serve': {
                method: 'PUT',
                isArray: false
            },
            'return': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();