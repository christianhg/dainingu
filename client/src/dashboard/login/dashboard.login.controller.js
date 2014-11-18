(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth, $window, socket) {
        var vm = this;

        vm.dashboardLogin = function(loginData) {
            /*auth.save(loginData, function(data) {
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
            });*/

            auth.signin(loginData, function(data) {
                console.log(data);
                if(data.success) {
                    // Get generated JWT token.
                    var token = data.token;
                    var user = data.user;
                    // Store token in sessionStorage.
                    $window.sessionStorage.token = token;

                    $window.sessionStorage.username = user.username;
                    // Initiate socket
                    socket.init();
                } else {
                    // Something went wrong. Delete token from sessionStorage if it exists.
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                }
            });
        };
    }
})();