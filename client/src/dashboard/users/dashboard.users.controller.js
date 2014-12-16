(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController(users, socket) {
        var vm = this;

        vm.getUsers = function() {
            users.query(function(users) {
                vm.users = users;
            });
        };

        vm.getUsers();

        socket.on('usersAdded', function() {
            vm.getUsers();
        });
    }
})();