/**
 * SessionsOrdersBegin Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersBegin', sessionsOrdersBegin);

    function sessionsOrdersBegin($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/begin', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'begin': {
                method: 'PUT',
                isArray: false
            },
            'stop': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();