(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('kitchen.login', {
                url: '/login',
                templateUrl: 'kitchen/login/kitchen.login.view.html',
                controller: 'KitchenLoginController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > kitchen > log ind'
                }
            });
    }
})();