(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('floor.sessions', {
                url: '/sessions',
                templateUrl: 'floor/sessions/floor.sessions.view.html',
                controller: 'FloorSessionsController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > floor > sessioner'
                }
            });
    }
})();