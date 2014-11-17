(function () {
    'use strict';

    angular
        .module('dainingu.floor.login')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('floor.login', {
                url: '/login',
                templateUrl: 'floor/login/floor.login.view.html',
                controller: 'FloorLoginController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Floor > Log in'
                }
            });
    }
})();