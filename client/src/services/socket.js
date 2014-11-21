(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('socket', socket);

	function socket(socketFactory) {
		return socketFactory({
			ioSocket: io.connect()
		});
		/*return socketFactory({
			ioSocket:  io.connect('http://localhost:2000', {
				query: 'token=' + $window.sessionStorage.loginToken
			})
		});*/
	}
})();