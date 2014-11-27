(function () {
	'use strict';

	angular
		.module('dainingu.core')
		.controller('CoreController', CoreController);

	function CoreController(auth, $scope, $state) {
		$scope.$on('$stateChangeStart', function(event, toState) {
			if(toState.data.restricted) {
				auth.validateLoginToken(function(validToken) {
					if(!validToken) {
						event.preventDefault();
						$state.go(toState.data.login);
					}
				});
			}
		});

		$scope.$on('$stateChangeSuccess', function(event, toState) {
			$scope.pageTitle = toState.data.pageTitle;
			$scope.pageClass = toState.data.pageClass;
		});
	}
})();