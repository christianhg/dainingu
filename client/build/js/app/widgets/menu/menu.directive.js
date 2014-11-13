(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('menu', menu);

    function menu() {
        var directive = {
            templateUrl: 'widgets/menu/menu.html',
            restrict: 'E',
            scope: {
                menuName: '=',
                menus: '=',
                dishes: '='
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
            vm.menuName = $scope.menuName;
            vm.menus = $scope.menus;
            vm.dishes = $scope.dishes;
        }
    }
})();