(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.users')
        .controller('DashboardUsersController', DashboardUsersController);

    function DashboardUsersController(users, socket) {
        var vm = this;

        socket.on('userAdded', function(data) {
            console.log(data.message);
        });

        socket.on('userUpdated', function(data) {
            console.log(data.message);
        });

        socket.on('userDeleted', function(data) {
            console.log(data.message);
        });

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