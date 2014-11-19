(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.menus', {
                url: '/menus',
                templateUrl: 'dashboard/menus/dashboard.menus.view.html',
                controller: 'DashboardMenusController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > menuer'
                }
            });
    }
})();(function () {
    'use strict';

})();