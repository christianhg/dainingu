(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.login', {
                url: '/login',
                templateUrl: 'dashboard/login/dashboard.login.view.html',
                controller: 'DashboardLoginController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard > login'
                }
            });
    }
})();