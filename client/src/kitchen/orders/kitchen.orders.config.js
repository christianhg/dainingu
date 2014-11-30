(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.orders')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('kitchen.orders', {
                url: '/orders',
                templateUrl: 'kitchen/orders/kitchen.orders.view.html',
                controller: 'KitchenOrdersController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > kitchen > ordrer',
                    restricted: true,
                    login: 'kitchen.login'
                }
            });
    }
})();