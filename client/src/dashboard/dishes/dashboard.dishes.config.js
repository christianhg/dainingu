(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            /**
             * Route for viewing all dishes and adding new.
             */
            .state('dashboard.dishes', {
                url: '/dishes',
                templateUrl: 'dashboard/dishes/dashboard.dishes.view.html',
                controller: 'DashboardDishesController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    login: 'dashboard.login',
                    pageTitle: 'dainingu > dashboard > retter'
                }
            })
            /**
             * Abstract route for specific dish.
             */
            .state('dashboard.dishes.id', {
                abstract: true,
                url: '/:id',
                template: '<ui-view/>'
            })
            /**
             * Route for deleting a dish.
             */
            .state('dashboard.dishes.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/dishes/delete/dashboard.dishes.id.delete.view.html',
                controller: 'DashboardDishesIdDeleteController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > slet ret'
                }
            })
            /**
             * Route for editing a dish.
             */
            .state('dashboard.dishes.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/dishes/edit/dashboard.dishes.id.edit.view.html',
                controller: 'DashboardDishesIdEditController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > redigér ret'
                }
            });
    }
})();