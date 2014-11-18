(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('socket', socket);

	function socket(socketFactory, $window) {
		var mySocket = socketFactory({
			prefix: '',
			ioSocket: io.connect('http://localhost:2000', {
				query: 'token=' + $window.sessionStorage.token,
				forceNew: true
			})
		});

		return {
			init: function() {
				return mySocket;
			}
		};
	}
})();