(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.menus', {
                url: '/menus',
                templateUrl: 'dashboard/menus/dashboard.menus.view.html',
                controller: 'DashboardMenusController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > menuer'
                }
            })
            .state('dashboard.menus.id', {
                url: '/:id',
                templateUrl: 'dashboard/menus/dashboard.menus.id.view.html',
                controller: 'DashboardMenusIdController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > menuer'
                }
            })
            .state('dashboard.menus.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/menus/dashboard.menus.id.edit.view.html',
                controller: 'DashboardMenusIdEditController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > menuer'
                }
            });
    }
})();