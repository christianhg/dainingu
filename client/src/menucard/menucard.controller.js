(function () {
	'use strict';

	angular
		.module('dainingu.menucard')
		.controller('MenucardController', MenucardController);

	function MenucardController(menus) {
		var vm = this;

		//vm.menus = menus.query();

		var socket = io.connect('http://localhost:2000');

		socket.on('menuUpdated', function(data) {
			console.log('menus updated');
			vm.menus = menus.query();
		});
	}
})();