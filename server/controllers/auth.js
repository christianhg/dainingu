(function () {
	'use strict';

	var User = require('../models/user');

	exports.signin = function(req, res, callback) {
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({ username: username }, function(err, user) {
			if(err) {
				res.send(err);
			}

			// username doesn't exist
			if(!user) {
				var data = {
					message: 'User signin failed',
					user: { username: username, password: password }
				};

				res.json(data);

				return callback(data);
			}

			user.comparePassword(password, function(err, isMatch) {

				var data = {};

				if(isMatch) {
					data = {
						message: 'User signed in',
						user: user
					};
				} else {
					data = {
						message: 'User signin failed',
						user: { username: username, password: password }
					};
				}

				res.json(data);

				callback(data);
			});
		});
	};

})();