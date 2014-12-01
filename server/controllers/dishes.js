(function () {
	'use strict';

	var sequelize = require("../config/sequelize");
	var Dish = sequelize.model('dish');
	var Menu = sequelize.model('menu');

	/**
	 * Activate dish.
	 */
	exports.activate = function(req, res, callback) {
		var dishId = req.params.id;

		Dish.find({where: {id: dishId}})
			.complete(function (err, dish) {
				if (err) {
					res.send(err);
				}

				dish.activate(function(isActive) {
					dish.save()
						.complete(function(err) {
							if(err) {
								res.send(err);
							}

							var data = {
								message: 'Dish activated',
								dish: dish
							};

							res.json(dish);

							callback(data);
						});
				});
			});
	};


	/**
	 * Deactivate dish.
	 */
	exports.deactivate = function(req, res, callback) {
		var dishId = req.params.id;

		Dish.find({where: {id: dishId}})
			.complete(function (err, dish) {
				if (err) {
					res.send(err);
				}

				dish.deactivate(function(isActive) {
					dish.save()
						.complete(function(err) {
							if(err) {
								res.send(err);
							}

							var data = {
								message: 'Dish deactivated',
								dish: dish
							};

							res.json(dish);

							callback(data);
						});
				});
			});
	};

	/**
	 * Delete dish.
	 */
	exports.destroy = function(req, res, callback) {
		var id = req.params.id;

		Dish.find({ where: { id: id }})
			.complete(function(err, dish) {
				if(!!err) {
					res.send(err);
				}

				dish.destroy().success(function() {
					var data = {
						message: 'Dish deleted',
						dish: dish
					};

					res.json(dish);

					callback(data);
				});
			});
	};

	/**
	 * Get all dishes.
	 */
	exports.index = function(req, res, callback) {
		var deep = req.query.deep;

		if(deep) {
			Dish.findAll({
				include: [Menu]
			})
				.complete(function(err, dishes) {
					if(!!err) {
						res.send(err);
					}

					var data = {
						message: 'Dishes shown with menu',
						dishes: dishes
					};

					res.json(dishes);

					callback(data);

				});
		} else {
			Dish.findAll()
				.complete(function(err, dishes) {
					if(!!err) {
						res.send(err);
					}

					var data = {
						message: 'Dishes shown',
						dishes: dishes
					};

					res.json(dishes);

					callback(data);

				});
		}

	};

	/**
	 * Get specific dish.
	 */
	exports.show = function(req, res, callback) {
		var id = req.params.id;

		Dish.find({ where: { id: id }})
			.complete(function(err, dish) {
				if(!!err) {
					res.send(err);
				}

				var data = {
					message: 'Dish shown',
					dish: dish
				};

				res.json(dish);

				callback(data);

			});
	};

	/**
	 * Add new dish.
	 */
	exports.store = function(req, res, callback) {
		var dish = Dish.build(req.body);

		dish
			.save()
			.complete(function(err) {
				if(!!err) {
					res.send(err);
				}

				var data = {
					message: 'Dish added',
					dish: dish
				};

				res.json(data);

				callback(data);
			});
	};

	/**
	 * Update dish.
	 */
	exports.update = function(req, res, callback) {
		var id = req.params.id;
		var name = req.body.name;
		var description = req.body.description;
		var price = req.body.price;
		var stock = req.body.stock;
		var menuId = req.body.menuId;

		Dish.find({ where: { id: id }})
			.complete(function(err, dish) {
				if(!!err) {
					res.send(err);
				}

				dish.updateAttributes({
					name: name,
					description: description,
					price: price,
					stock: stock,
					menuId: menuId
				}).success(function() {
					var data = {
						message: 'Dish updated',
						dish: dish
					};

					res.json(data);

					callback(data);
				});
			});
	};
})();