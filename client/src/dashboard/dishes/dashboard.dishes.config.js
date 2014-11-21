(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('dashboard.dishes', {
                url: '/dishes',
                templateUrl: 'dashboard/dishes/dashboard.dishes.view.html',
                controller: 'DashboardDishesController',
                controllerAs: 'vm',
                data: {
                    restricted: true,
                    pageTitle: 'dainingu > dashboard > retter'
                }
            });
    }
})();(function () {
    'use strict';

})();