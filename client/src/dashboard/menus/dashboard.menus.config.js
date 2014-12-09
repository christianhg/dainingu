(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            /**
             * Route for viewing all menus and adding new.
             */
            .state('dashboard.menus', {
                url: '/menus',
                templateUrl: 'dashboard/menus/dashboard.menus.view.html',
                controller: 'DashboardMenusController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    login: 'dashboard.login',
                    pageTitle: 'dainingu > dashboard > menuer'
                }
            })
            /**
             * Abstract route for specific menu.
             */
            .state('dashboard.menus.id', {
                abstract: true,
                url: '/:id',
                template: '<ui-view/>'
            })
            /**
             * Route for deleting a menu.
             */
            .state('dashboard.menus.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/menus/delete/dashboard.menus.id.delete.view.html',
                controller: 'DashboardMenusIdDeleteController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > menuer > slet'
                }
            })
            /**
             * Route for editing a menu.
             */
            .state('dashboard.menus.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/menus/edit/dashboard.menus.id.edit.view.html',
                controller: 'DashboardMenusIdEditController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > menuer > redigér'
                }
            });
    }
})();