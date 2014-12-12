(function () {
	'use strict';

	var sequelize = require('../config/sequelize');

	var Menu = sequelize.model('menu');
	var Dish = sequelize.model('dish');

	/**
	 * Delete menu.
	 * @param req
	 * @param res
	 * @param callback
	 */
	exports.destroy = function(req, res, callback) {
		var id = req.params.id;

		Menu.find({ where: { id: id }})
			.complete(function(err, menu) {
				if(!!err) {
					res.send(err);
				}

				menu.destroy().success(function() {
					var data = {
						message: 'Menuen ' + menu.name + ' blev slettet',
						menu: menu
					};

					res.json(data);

					callback(data);
				});
			});
	};

	/**
	 * Get all menus.
	 * If query string parameter deep is true, the menus will be shown
	 * with dishes.
	 * @param req
	 * @param res
	 * @param callback
	 */
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

	/**
	 * Get specific menu.
	 * If query string parameter deep is true, the menu will be shown
	 * with dishes.
	 * @param req
	 * @param res
	 * @param callback
	 */
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

	/**
	 * Add new menu.
	 * @param req
	 * @param res
	 * @param callback
	 */
	exports.store = function(req, res, callback) {
		var name = req.body.name;

		Menu.create({
			name: name
		}).complete(function(err, menu) {
			if(err) {
				res.send(err);
			}

			var data = {
				message: 'Menuen ' + menu.name + ' er tilføjet',
				menu: menu
			};

			res.json(data);

			callback(data);
		});
	};

	/**
	 * Update menu.
	 * @param req
	 * @param res
	 * @param callback
	 */
	exports.update = function(req, res, callback) {
		var id = req.params.id;
		var name = req.body.name;

		Menu.find({
			where: { id: id }
		})
			.complete(function(err, menu) {
				menu.updateAttributes({
					name: name
				}).complete(function(err, menu) {
					var data = {
						message: 'Menuen ' + menu.name + ' er opdateret',
						menu: menu
					};

					res.json(data);

					callback(data);
				});
			});
	};

})();