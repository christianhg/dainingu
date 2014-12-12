(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController($scope, users, socket) {
        var vm = this;

        vm.getUsers = function() {
            users.query(function(users) {
                vm.users = users;
            });
        };

        vm.getUsers();

        socket.on('userAdded', function(data) {
            vm.getUsers();
            console.log(data);
        });

        socket.on('userUpdated', function(data) {
            vm.getUsers();
        });

        socket.on('userDeleted', function(data) {
            vm.getUsers();
        });
    }
})();