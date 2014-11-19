(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .controller('MenucardActivateController', MenucardActivateController);

    function MenucardActivateController(auth, $window) {
        var vm = this;

        vm.activateSession = function(key) {
            auth.activateSession(key, function(data) {
                console.log(data);
                if(data.success) {
                    var token = data.token;
                    $window.sessionStorage.menucardToken = token;
                } else {
                    delete $window.sessionStorage.menucardToken;
                }
            });
        };
    }
})();