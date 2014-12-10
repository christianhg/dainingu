(function () {
	'use strict';

	var sequelize = require('../config/sequelize');
	var Dish = sequelize.model('dish');
	var Menu = sequelize.model('menu');

	/**
	 * Delete specific dish from menu.
	 */
	exports.destroy = function(req, res, callback) {
		var menuId = req.params.menuId;
		var dishId = req.params.dishId;

		Menu.find({ where: { id: menuId}})
			.complete(function(err, menu) {
				if(err) {
					res.send(err);
				}

				Dish.find({ where: { id: dishId}})
					.complete(function(err, dish) {
						menu.removeDish(dish).success(function(menuId) {
							var data = {
								message: 'Dish removed from menu',
								menu: menu,
								dish: dish
							};

							res.json(data);

							callback(data);
						});
					});
			});
	};

	/**
	 * Get all dishes in menu.
	 */
	exports.index = function(req, res, callback) {
		var menuId = req.params.menuId;

		Menu.find({ where: { id: menuId }})
			.complete(function(err, menu) {
				if(err) {
					res.send(err);
				}

				menu.getDishes().success(function(dishes) {
					var data = {
						message: 'Dishes shown',
						dishes: dishes
					};

					res.json(dishes);

					callback(data);

				});
			});
	};

	/**
	 * Add new dish to menu.
	 */
	exports.store = function(req, res, callback) {
		var menuId = req.params.menuId;
		var dish = req.body;

		Menu.find({ where: { id: menuId }})
			.complete(function(err, menu) {
				if(err) {
					res.send(err);
				}

				Dish.create({
					name: dish.name
				}).success(function(dish) {

					menu.addDish([dish.id]).success(function(dish) {
						var data = {
							message: 'Dish added to menu',
							menu: menu,
							dish: dish
						};

						res.json(data);

						callback(data);
					});
				});


			});
	};

})();