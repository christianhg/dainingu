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
        return $resource('/api/sessions/:sessionId/activate', {sessionId: '@sessionId', orderId: '@orderId'}, {
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