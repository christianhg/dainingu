(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth, $window, socket) {
        var vm = this;

        vm.dashboardLogin = function(loginData) {
            auth.signin(loginData, function(data) {
                console.log(data);
                if(data.success) {
                    // Get generated JWT token.
                    var token = data.token;
                    // Store token in sessionStorage.
                    $window.sessionStorage.token = token;
                    // Initiate socket
                    socket.init();
                } else {
                    // Something went wrong. Delete token from sessionStorage if it exists.
                    delete $window.sessionStorage.token;
                }
            });
        };
    }
})();