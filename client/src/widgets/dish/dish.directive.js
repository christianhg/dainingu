(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('dish', dish);

    function dish() {
        var directive = {
            templateUrl: 'widgets/dish/dish.html',
            restrict: 'E',
            scope: {
                info: '='
            },
            controller: DishController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function DishController($scope) {
            var vm = this;

            vm.dish = $scope.info;
        }
    }
})();