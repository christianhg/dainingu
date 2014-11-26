(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('dashboard.users', {
                url: '/users',
                templateUrl: 'dashboard/users/dashboard.users.view.html',
                controller: 'DashboardUsersController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > brugere'
                }
            })
            .state('dashboard.users.id', {
                abstract: true,
                url: '/:id',
                template: '<ui-view/>'
            })
            .state('dashboard.users.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/users/delete/dashboard.users.id.delete.view.html',
                controller: 'DashboardUsersIdDeleteController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > brugere'
                }
            })
            .state('dashboard.users.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/users/edit/dashboard.users.id.edit.view.html',
                controller: 'DashboardUsersIdEditController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > brugere'
                }
            });
    }
})();