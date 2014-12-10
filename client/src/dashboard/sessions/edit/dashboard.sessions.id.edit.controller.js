(function () {
    'use strict';

    angular
        .module('dainingu.dashboard.sessions')
        .controller('DashboardSessionsIdEditController', DashboardSessionsIdEditController);

    function DashboardSessionsIdEditController($scope, $state, $stateParams, sessions) {
        var vm = this;

        sessions.get({id: $stateParams.id}, function(session) {
            vm.session = session;
        });

        $scope.editSession = function() {
            sessions.update({ id: vm.session._id }, vm.session, function(data) {
                $state.go('dashboard.sessions', null, { reload: true });
            });
        };

    }
})();