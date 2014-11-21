(function () {
    'use strict';

    angular
        .module('dainingu.floor.sessions')
        .controller('FloorSessionsController', FloorSessionsController);

    function FloorSessionsController(sessions) {
        var vm = this;

        vm.sessions = sessions.query();
    }
})();