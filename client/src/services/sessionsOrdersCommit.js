/**
 * SessionsOrdersCommit Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('sessionsOrdersCommit', sessionsOrdersCommit);

    function sessionsOrdersCommit($resource) {
        return $resource('/api/sessions/:sessionId/orders/:orderId/commit', {sessionId: '@sessionId', orderId: '@orderId'}, {
            'commit': {
                method: 'PUT',
                isArray: false
            },
            'pull': {
                method: 'DELETE',
                isArray: false
            }
        });
    }
})();