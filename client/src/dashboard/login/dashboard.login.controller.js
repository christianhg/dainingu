(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.login')
        .controller('DashboardLoginController', DashboardLoginController);

    function DashboardLoginController(auth, $window) {
        var vm = this;

        vm.dashboardLogin = function(loginData) {
            auth.save(loginData, function(data) {
                if(data.success) {
                    $window.sessionStorage.token = data.token;
                    //token = data.token;
                } else {
                    delete $window.sessionStorage.token;
                }
            });
        };

        /*var token;
        var socket;

        function connect() {
            if(token !== undefined) {
                socket = io.connect('http://localhost:2000', {
                    query: 'token=' + token,
                    forceNew: true
                });
            } else {
                socket = io.connect('http://localhost:2000', {
                    forceNew: true
                });
            }


            socket.on('connect', function() {
                console.log('authenticated');
            }).on('disconnect', function () {
                console.log('disconnected');
            }).on('pong', function() {
                console.log('pong');
            });
        }

        connect();

        vm.loginData = {};

        vm.ping = function() {
            socket.emit('ping');
        };

        vm.dashboardLogin = function(loginData) {
             auth.save(loginData, function(data) {

                if(data.success) {
                    token = data.token;
                    connect();

                }

            });
        };*/

    }
})();