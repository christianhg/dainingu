/**
 * SessionsActive Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsActivate', sessionsActivate);

    function sessionsActivate($resource) {
        return $resource('/api/sessions/:sessionId/active', {sessionId: '@sessionId', orderId: '@orderId'}, {
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