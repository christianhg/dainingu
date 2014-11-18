(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(menus) {
		var vm = this;

		vm.menus = menus.query();

		/*socket.on('menuAdded', function(data) {
			console.log(data.message);

			// Push the newly added menu to the list of menus.
			//vm.menus.push(data.menu);
		});

		socket.on('menuUpdated', function(data) {
			console.log(data.message);
		});

		socket.on('menuDeleted', function(data) {
			console.log(data.message);
		});*/
	}
})();