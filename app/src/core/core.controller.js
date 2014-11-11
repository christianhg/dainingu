(function () {
	'use strict';

	angular
		.module('dainingu.core')
		.controller('CoreController', CoreController);

	function CoreController($scope) {
		$scope.$on('$stateChangeSuccess', function(event, toState) {
			$scope.pageTitle = toState.data.pageTitle;
			$scope.pageClass = toState.data.pageClass;
		});
	}

})();