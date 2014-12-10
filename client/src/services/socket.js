(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('socket', socket);

	function socket(socketFactory) {
		return socketFactory({
			ioSocket: io.connect()
		});
	}
})();