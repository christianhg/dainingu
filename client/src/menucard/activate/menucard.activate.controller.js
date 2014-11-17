(function () {
    'use strict';

    angular
        .module('dainingu.menucard.activate')
        .controller('MenucardActivateController', MenucardActivateController);

    function MenucardActivateController(sessions) {
        var vm = this;

        vm.activateSession = function(key) {
            console.log(key);
        };
    }
})();