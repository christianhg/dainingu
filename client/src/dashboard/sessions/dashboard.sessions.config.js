(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.sessions', {
                url: '/sessions',
                templateUrl: 'dashboard/sessions/dashboard.sessions.view.html',
                controller: 'DashboardSessionsController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard > Sessioner'
                }
            });
    }
})();