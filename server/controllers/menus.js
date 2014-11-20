(function () {
	'use strict';

	var sequelize = require("../config/sequelize");

	var Menu = sequelize.model('menu');

	exports.destroy = function(req, res, callback) {
		var id = req.params.id;

		Menu.find({ where: { id: id }})
			.complete(function(err, menu) {
				if(!!err) {
					res.send(err);
				}

				menu.destroy().success(function() {
					var data = {
						message: 'Menu deleted',
						menus: menu
					};

					res.json(menu);

					callback(data);
				});
			});
	};

	exports.index = function(req, res, callback) {
		Menu.findAll()
			.complete(function(err, menus) {
				if(!!err) {
					res.send(err);
				}

				var data = {
					message: 'Menus shown',
					menus: menus
				};

				res.json(menus);

				callback(data);

			});
	};

	exports.show = function(req, res, callback) {
		var id = req.params.id;

		Menu.find({ where: { id: id }})
			.complete(function(err, menu) {
				if(!!err) {
					res.send(err);
				}

				var data = {
					message: 'Menu shown',
					menus: menu
				};

				res.json(menu);

				callback(data);

			});
	};

	exports.store = function(req, res, callback) {
		var name = req.body.name;

		var menu = Menu.build({
			name: name
		});

		menu
			.save()
			.complete(function(err) {
				if(!!err) {
					console.log('The instance has not been saved:', err);
				} else {
					console.log('We have a persisted instance now')
				}
			});
	};

	exports.update = function(req, res, callback) {
		var id = req.params.id;
		var name = req.body.name;

		Menu.find({ where: { id: id }})
			.complete(function(err, menu) {
				if(!!err) {
					res.send(err);
				}

				menu.updateAttributes({
					name: name
				}).success(function() {
					var data = {
						message: 'Menu updated',
						menus: menu
					};

					res.json(menu);

					callback(data);
				});
			});
	};
})();