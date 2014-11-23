(function () {
	'use strict';

	var sequelize = require("../config/sequelize");

	var Menu = sequelize.model('menu');
	var Dish = sequelize.model('dish');

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
		var deep = req.query.deep;

		if(deep) {
			Menu.findAll({
				include: [Dish]
			})
				.complete(function(err, menus) {
					if(!!err) {
						res.send(err);
					}

					var data = {
						message: 'Menus shown with dishes',
						menus: menus
					};

					res.json(menus);

					callback(data);

				});
		} else {
			Menu.findAll({

			})
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
		}
	};

	exports.show = function(req, res, callback) {
		var id = req.params.id;
		var deep = req.query.deep;

		if(deep) {
			Menu.find({
				where: { id: id },
				include: [Dish]
			})
				.complete(function(err, menu) {
					if(!!err) {
						res.send(err);
					}

					var data = {
						message: 'Menu shown with dishes',
						menu: menu
					};

					res.json(menu);

					callback(data);

				});
		} else {
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
		}
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

		console.log(id, name);

		Menu.find({
			where: { id: id }
		})
			.complete(function(err, menu) {
				menu.updateAttributes({
					name: name
				}).success(function() {
					if(dish) {
						menu.addDish([dish.id]).success(function(dish) {

						});
					}

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