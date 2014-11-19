(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(auth) {
		var vm = this;

		auth.validateMenucardToken(function(validToken) {
			vm.menucardActivated = validToken;
		});
	}
})();