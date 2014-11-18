(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.menus')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.menus', {
                url: '/menus',
                /**resolve: {
                    authenticated: function(auth) {
                        return auth.validateToken(function(valid) {
                            return valid;
                        });
                    }
                },*/
                templateUrl: 'dashboard/menus/dashboard.menus.view.html',
                controller: 'DashboardMenusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard > Menuer'
                }
            });
    }
})();(function () {
    'use strict';

})();