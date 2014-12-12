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
					error: err
				};

				res.json(data);

				return callback(data);
			}

			if(user) {
				data = {
					message: 'Signup failed'
				};

				res.json(data);

				return callback(data);
			}

			var newUser = new User();
			newUser.username = username;
			newUser.password = password;

			newUser.save(function(err) {
				if(err) {
					data = {
						message: 'Signup failed',
						error: err
					};

					res.json(data);

					return callback(data);
				}

				data = {
					message: 'User added'
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
					message: 'User signin failed.'
				};

				res.json(data);

				return callback(false, data);
			}

			user.comparePassword(password, function(err, isMatch) {

				var data = {};

				if(isMatch) {
					var token = jwt.sign(user._id, secrets.jwtSecrets.auth, { expiresInMinutes: 60*5 });

					data = {
						message: 'User signin successful.',
						success: true,
						token: token,
						user: {
							username: user.username
						}
					};

					res.json(data);

					callback(true, data);
				} else {
					data = {
						message: 'User signin failed.'
					};

					res.json(data);

					callback(false, data);
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