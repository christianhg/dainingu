(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .controller('MenucardActivateController', MenucardActivateController);

    function MenucardActivateController(auth, $window) {
        var vm = this;

        vm.activateMenucard = function(key) {

            auth.activateSession(key, function(data) {
                console.log(data);

                vm.activationMessage = data.message;

                // If activation was successful.
                if(data.success) {
                    vm.activationSuccessful = true;
                    // Save token in sessionStorage.
                    var token = data.token;
                    $window.sessionStorage.menucardToken = token;
                } else {
                    vm.activationSuccessful = false;
                    // Delete token from sessionStorage.
                    delete $window.sessionStorage.menucardToken;
                }
            });

        };
    }
})();