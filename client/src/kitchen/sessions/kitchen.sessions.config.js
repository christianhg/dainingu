(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.sessions')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('kitchen.sessions', {
                url: '/sessions',
                templateUrl: 'kitchen/sessions/kitchen.sessions.view.html',
                controller: 'KitchenSessionsController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > kitchen > sessioner',
                    restricted: true,
                    login: 'kitchen.login'
                }
            });
    }
})();