(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController(users) {
        var vm = this;

        vm.users = users.query();

        vm.addUser = function(newUser) {
            users.save(newUser, function(user) {
                console.log(user);
            });
        };

        vm.deleteUser = function(id) {
            users.delete({}, {'id': id}, function(menu) {
                vm.users = users.query();
            });
        };
    }
})();