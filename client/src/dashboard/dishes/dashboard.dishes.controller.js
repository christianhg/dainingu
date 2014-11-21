(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.dishes')
        .controller('DashboardDishesController', DashboardDishesController);

    function DashboardDishesController(dishes, socket) {
        var vm = this;

        vm.dishes = [];
    }
})();