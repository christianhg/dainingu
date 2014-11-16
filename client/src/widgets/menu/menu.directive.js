(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('menu', menu);

    function menu() {
        var directive = {
            templateUrl: 'widgets/menu/menu.view.html',
            restrict: 'E',
            scope: {
                info: '='
            },
            controller: MenuController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function MenuController($scope) {
            var vm = this;

            vm.menu = $scope.info;
        }
    }
})();