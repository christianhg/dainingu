(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('dashboard.users', {
                url: '/users',
                templateUrl: 'dashboard/users/dashboard.users.view.html',
                controller: 'DashboardUsersController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'Dashboard > Brugere'
                }
            });
    }
})();