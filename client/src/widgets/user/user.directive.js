(function () {
    'use strict';

    angular
        .module('dainingu.widgets')
        .directive('user', user);

    function user() {
        var directive = {
            templateUrl: 'widgets/user/user.view.html',
            restrict: 'E',
            scope: {
                info: '='
            },
            controller: UserController,
            controllerAs: 'vm'
        };

        return directive;

        /**
         * @ngInject
         */
        function UserController($scope) {
            var vm = this;

            vm.user = $scope.info;
        }
    }
})();