(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.orders')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            /**
             * Route for viewing all orders.
             */
            .state('dashboard.orders', {
                url: '/orders',
                templateUrl: 'dashboard/orders/dashboard.orders.view.html',
                controller: 'DashboardOrdersController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    login: 'dashboard.login',
                    pageTitle: 'dainingu > dashboard > ordrer'
                }
            });
    }
})();