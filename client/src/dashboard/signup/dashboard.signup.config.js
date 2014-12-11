(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.signup')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            /**
             * Abstract signup route.
             */
            .state('dashboard.signup', {
                abstract: true,
                url: '/signup',
                template: '<ui-view/>'
            })
            /**
             * Route for dashboard signup.
             */
            .state('dashboard.signup.token', {
                url: '/:token',
                templateUrl: 'dashboard/signup/dashboard.signup.view.html',
                controller: 'DashboardSignupController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > dashboard > opret bruger'
                }
            });
    }
})();