(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('dish', dish);

    function dish() {
        var directive = {
            templateUrl: 'widgets/dish/dish.html',
            restrict: 'E',
            controller: DishController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function DishController($scope) {
            var vm = this;

        }
    }
})();