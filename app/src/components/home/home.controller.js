(function() {
    'use strict';

    angular
        .module('dainingu.home')
        .controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;

        vm.hej = "hejhej";
    }
})();