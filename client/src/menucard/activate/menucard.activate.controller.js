(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .controller('MenucardActivateController', MenucardActivateController);

    function MenucardActivateController(auth, $state) {
        var vm = this;

        vm.activateMenucard = function(key) {
            auth.activateSession(key, function(data) {
                vm.activationMessage = data.message;

                // If activation was successful.
                if(data.success) {
                    //vm.activationSuccessful = true;
                    $state.go('menucard.menus', null, { refresh: true });
                } else {
                    vm.activationSuccessful = false;
                }
            });

        };
    }
})();