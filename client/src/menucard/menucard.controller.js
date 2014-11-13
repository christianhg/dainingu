(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(menus) {
		var vm = this;

		vm.menus = menus.query();
	}
})();