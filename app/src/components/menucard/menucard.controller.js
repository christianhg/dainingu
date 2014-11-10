(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(MenusFactory) {
		var vm = this;

		vm.menus = MenusFactory;
	}
})();