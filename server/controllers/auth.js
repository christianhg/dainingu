(function () {
	'use strict';

	var jwt = require('jsonwebtoken');
	var secrets = require('../config/secrets');
	var Session = require('../models/mongoose/session');
	var User = require('../models/mongoose/user');

	/**
	 * Activate session using session key.
	 */
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

	/**
	 * Get session id.
	 */
	exports.getSessionId = function(req, res, callback) {
		var menucardToken = req.body.token;

		jwt.verify(menucardToken, secrets.jwt_secret, function(err, sessionId) {

			Session.findOne({ _id: sessionId }, function(err, session) {
				if(err) {
					res.send(err);
				}

				if(!session) {
					res.send(false);
				} else {
					res.send(sessionId);

				}
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
					var token = jwt.sign(user._id, secrets.jwt_secret, { expiresInMinutes: 60*5 });

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
	exports.validateLoginToken = function(req, res, callback) {
		var candidateToken = req.body.token;

		jwt.verify(candidateToken, secrets.jwt_secret, function(err, userId) {
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

	/**
	 * Validate menucard token.
	 */
	exports.validateMenucardToken = function(req, res, callback) {
		var menucardToken = req.body.token;

		jwt.verify(menucardToken, secrets.jwt_secret, function(err, sessionId) {

			Session.findOne({ _id: sessionId }, function(err, session) {
				if(err) {
					res.send(err);
				}

				if(!session) {
					res.send(false);
				} else {
					session.status(function(isActive, isExpired) {
						if(!isActive || isExpired) {
							res.send(false);
						} else {
							res.send(true);
						}
					});
				}
			});
		})
	}

})();