(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.dishes', {
                url: '/dishes',
                templateUrl: 'dashboard/dishes/dashboard.dishes.view.html',
                controller: 'DashboardDishesController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > retter'
                }
            })
            .state('dashboard.dishes.id', {
                url: '/:id',
                templateUrl: 'dashboard/dishes/dashboard.dishes.id.view.html',
                controller: 'DashboardDishesIdController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > retter'
                }
            })
            .state('dashboard.dishes.id.delete', {
                url: '/delete',
                templateUrl: 'dashboard/dishes/dashboard.dishes.id.delete.view.html',
                controller: 'DashboardDishesIdDeleteController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > retter'
                }
            })
            .state('dashboard.dishes.id.edit', {
                url: '/edit',
                templateUrl: 'dashboard/dishes/dashboard.dishes.id.edit.view.html',
                controller: 'DashboardDishesIdEditController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > retter'
                }
            });
    }
})();