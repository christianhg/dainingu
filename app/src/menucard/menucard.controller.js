(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController() {
		var vm = this;

		vm.hej = "menucard";
	}
})();