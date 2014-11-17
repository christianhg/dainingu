(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('menucard.activate', {
                url: '/activate',
                templateUrl: 'menucard/activate/menucard.activate.view.html',
                controller: 'MenucardActivateController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Menucard > Activate'
                }
            });
    }
})();