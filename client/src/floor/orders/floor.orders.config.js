(function () {
    'use strict';

    angular
        .module('dainingu.floor.orders')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('floor.orders', {
                url: '/orders',
                templateUrl: 'floor/orders/floor.orders.view.html',
                controller: 'FloorOrdersController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > floor > ordrer',
                    restricted: true,
                    login: 'floor.login'
                }
            });
    }
})();