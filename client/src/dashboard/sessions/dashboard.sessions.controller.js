(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsController', DashboardSessionsController);

    function DashboardSessionsController(sessions, socket) {
        var vm = this;

        vm.getSessions = function() {
            vm.sessions = sessions.query();
        };

        vm.getSessions();

        socket.on('ordersUpdated', function(data) {
            vm.getSessions();
        });

        socket.on('sessionUpdated', function(data) {
            vm.getSessions();
        });


    }
})();