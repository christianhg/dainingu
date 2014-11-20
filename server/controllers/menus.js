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
						menu: menu
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
					menu: menu
				};

				res.json(menu);

				callback(data);

			});
	};

	exports.store = function(req, res, callback) {
		var name = req.body.name;

		Menu.create({
			name: name
		}).success(function(err, menu) {
			if(err) {
				res.send(err);
			}

			var data = {
				message: 'Menu added',
				menu: menu
			};

			res.json(menu);

			callback(data);
		});
	};

	exports.update = function(req, res, callback) {
		var id = req.params.id;
		var name = req.body.name;
		var dish = req.body.dish;

		Menu.find({ where: { id: id }})
			.complete(function(err, menu) {
				menu.addDish([dish.id]).success(function(dish) {
					var data = {
						message: 'Menu updated',
						menu: menu
					};

					res.json(menu);

					callback(data);
				});
			});

	};

})();