(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            /**
             * Route for dashboard login.
             */
            .state('dashboard.login', {
                url: '/login',
                templateUrl: 'dashboard/login/dashboard.login.view.html',
                controller: 'DashboardLoginController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > log ind'
                }
            });
    }
})();