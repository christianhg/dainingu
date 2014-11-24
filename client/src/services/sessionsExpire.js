/**
 * SessionsExpire Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsExpire', sessionsExpire);

    function sessionsExpire($resource) {
        return $resource('/api/sessions/:sessionId/expire', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'expire': {
                method: 'PUT',
                isArray: false
            },
            'resume': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();