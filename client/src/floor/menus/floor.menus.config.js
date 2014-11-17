(function () {
    'use strict';

    angular
        .module('dainingu.floor.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('floor.menus', {
                url: '/menus',
                templateUrl: 'floor/menus/floor.menus.view.html',
                controller: 'FloorMenusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Floor > Menuer'
                }
            });
    }
})();