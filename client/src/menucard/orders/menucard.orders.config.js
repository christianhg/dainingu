(function () {
    'use strict';

    angular
        .module('dainingu.menucard.orders')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('menucard.orders', {
                url: '/orders',
                templateUrl: 'menucard/orders/menucard.orders.view.html',
                controller: 'MenucardOrdersController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > menucard > ordrer'
                }
            });
    }
})();