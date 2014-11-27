(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.orders')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('cashregister.orders', {
                url: '/orders',
                templateUrl: 'cashregister/orders/cashregister.orders.view.html',
                controller: 'CashregisterOrdersController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > cashregister > orders',
                    restricted: true,
                    login: 'cashregister.login'
                }
            });
    }
})();