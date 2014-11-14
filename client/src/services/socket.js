(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('socket', socket);

	function socket(socketFactory) {
		// var mySocket = io.connect('http://localhost:2000');

		var mySocket = socketFactory({

		});

		return mySocket;
	}
})();