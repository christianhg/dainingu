(function () {
	'use strict';

	var User = require('../models/user');
	var jwt = require('jsonwebtoken');
	var secrets = require('../config/secrets');

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

				return callback(false, data);
			}

			user.comparePassword(password, function(err, isMatch) {

				var data = {};

				if(isMatch) {
					var token = jwt.sign(user, secrets.jwt_secret, { expiresInMinutes: 60*5 });

					data = {
						message: 'User signed in',
						success: true,
						token: token,
						user: user
					};

					res.json(data);

					callback(true, data);
				} else {
					data = {
						message: 'User signin failed',
						user: { username: username, password: password }
					};

					res.json(data);

					callback(false, data);
				}


			});
		});
	};

})();