(function () {
	'use strict';

	var User = require('../models/user');
	var jwt = require('jsonwebtoken');
	var secrets = require('../config/secrets');
	var Session = require('../models/session');


	exports.activateSession = function(req, res, callback) {
		var candidateKey = req.body.key;

		Session.findOne({ key: candidateKey }, function(err, session) {
			if(err) {
				res.send(err);
			}

			// Session doesn't exist
			if(!session) {
				var data = {
					message: 'Session activation failed.'
				};

				res.json(data);

				return callback(data);
			} else {
				session.status(function(isActive, isExpired) {
					if(isExpired) {
						var data = {
							message: 'Session activation failed.',
							session: session._id
						};

						res.json(data);

						return callback(data);
					} else {
						// Activate session.
						session.activate(function(activated) {
							if(activated) {
								session.save();
							}
						});

						var token = jwt.sign(session._id, secrets.jwt_secret, { expiresInMinutes: 60*5 });

						var data = {
							message: 'Session activation successful.',
							session: session._id,
							success: true,
							token: token
						};

						res.json(data);

						return callback(data);
					}
				})
			}
		});

	};

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

	exports.validateToken = function(req, res, callback) {
		var candidateToken = req.body.token;

		jwt.verify(candidateToken, secrets.jwt_secret, function(err, decodedToken) {
			console.log(decodedToken.username);

			User.findOne({ username: decodedToken.username }, function(err, user) {
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