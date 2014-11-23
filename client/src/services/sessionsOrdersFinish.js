/**
 * SessionsOrdersFinish Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersFinish', sessionsOrdersFinish);

    function sessionsOrdersFinish($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/finish', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'finish': {
                method: 'PUT',
                isArray: false
            },
            'unFinish': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();