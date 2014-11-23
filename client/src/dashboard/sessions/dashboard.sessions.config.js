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
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > sessioner'
                }
            })
            .state('dashboard.sessions.id', {
                url: '/:id',
                templateUrl: 'dashboard/sessions/dashboard.sessions.id.view.html',
                controller: 'DashboardSessionsIdController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > sessioner'
                }
            })
            .state('dashboard.sessions.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/sessions/dashboard.sessions.id.delete.view.html',
                controller: 'DashboardSessionsIdDeleteController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > sessioner'
                }
            })
            .state('dashboard.sessions.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/sessions/dashboard.sessions.id.edit.view.html',
                controller: 'DashboardSessionsIdEditController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > sessioenr'
                }
            });
    }
})();