(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .controller('MenucardActivateController', MenucardActivateController);

    function MenucardActivateController(auth) {
        var vm = this;

        vm.activateMenucard = function(key) {

            auth.activateSession(key, function(data) {
                console.log(data);

                vm.activationMessage = data.message;

                // If activation was successful.
                if(data.success) {
                    vm.activationSuccessful = true;
                } else {
                    vm.activationSuccessful = false;
                }
            });

        };
    }
})();