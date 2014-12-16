(function () {
	'use strict';

	var jwt = require('jsonwebtoken');
	var secrets = require('../config/secrets');
	var User = require('../models/mongoose/user');

	var checkSignupToken = function(candidateToken, callback) {
		if(candidateToken === secrets.signupToken) {
			callback(true);
		} else {
			callback(false);
		}
	};


	/**
	 * Sign up new user.
	 */
	exports.signup = function(req, res, callback) {
		var username = req.body.username;
		var password = req.body.password;
		var signupToken = req.body.signupToken;
		var data = {};

		checkSignupToken(signupToken, function(validToken) {
			if(!validToken) {
				res.send(false);
			}
		});

		User.findOne({ username: username }, function(err, user) {
			if(err) {
				data = {
					message: 'Signup failed',
					success: false,
					error: err
				};

				res.json(data);

				return callback(data);
			}

			if(user) {
				data = {
					message: 'Signup failed',
					success: false
				};

				res.json(data);

				return callback(data);
			}

			var newUser = new User();
			newUser.username = username;
			newUser.password = password;

			newUser.save(function(err) {
				if(err) {
					res.send(err);
				}

				var data = {
					message: 'Brugeren ' + newUser.username + ' er tilføjet',
					success: true,
					user: newUser
				};

				res.json(data);

				callback(data);
			});
		});
	};

	/**
	 * Sign user in.
	 */
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
					success: false
				};

				res.json(data);

				return callback(data);
			}

			user.comparePassword(password, function(err, isMatch) {

				var data = {};

				if(isMatch) {
					var token = jwt.sign(user._id, secrets.jwtSecrets.auth, { expiresInMinutes: 60*5 });

					data = {
						message: 'Brugeren ' + user.username + ' loggede ind',
						success: true,
						token: token,
						user: {
							_id: user._id,
							username: user.username
						}
					};

					res.json(data);

					callback(data);
				} else {
					data = {
						message: 'User signin failed.',
						success: false
					};

					res.json(data);

					callback(data);
				}


			});
		});
	};

	/**
	 * Validate login token.
	 */
	exports.validate = function(req, res, callback) {
		var candidateToken = req.body.token;

		jwt.verify(candidateToken, secrets.jwtSecrets.auth, function(err, userId) {
			User.findOne({ _id: userId }, function(err, user) {
				if(err) {
					res.send(err);
				}

				if(user) {
					res.send(true);
				} else {
					res.send(false);
				}
			});
		});
	};

})();