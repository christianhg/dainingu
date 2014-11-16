(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController() {
        var vm = this;

        vm.hej = 'users';
    }
})();