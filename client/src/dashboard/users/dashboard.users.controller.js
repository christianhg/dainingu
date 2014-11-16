(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController(users) {
        var vm = this;

        vm.users = users.query();

        vm.addUser = function() {
            users.save(vm.user, function(user) {
                console.log(user);
            });
        };
    }
})();