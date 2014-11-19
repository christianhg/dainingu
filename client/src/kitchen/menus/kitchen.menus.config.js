(function () {
    'use strict';

    angular
        .module('dainingu.kitchen.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('kitchen.menus', {
                url: '/menus',
                templateUrl: 'kitchen/menus/kitchen.menus.view.html',
                controller: 'KitchenMenusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'dainingu > kitchen > menuer'
                }
            });
    }
})();