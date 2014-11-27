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
                    login: 'dashboard.login',
                    pageTitle: 'dainingu > dashboard > sessioner'
                }
            })
            .state('dashboard.sessions.id', {
                abstract: true,
                url: '/:id',
                template: '<ui-view/>'
            })
            .state('dashboard.sessions.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/sessions/delete/dashboard.sessions.id.delete.view.html',
                controller: 'DashboardSessionsIdDeleteController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > sessioner'
                }
            })
            .state('dashboard.sessions.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/sessions/edit/dashboard.sessions.id.edit.view.html',
                controller: 'DashboardSessionsIdEditController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > sessioenr'
                }
            });
    }
})();