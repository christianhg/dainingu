(function () {
    'use strict';

    angular
        .module('dainingu.cashregister.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('cashregister.login', {
                url: '/login',
                templateUrl: 'cashregister/login/cashregister.login.view.html',
                controller: 'CashregisterLoginController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > cashregister > log ind'
                }
            });
    }
})();