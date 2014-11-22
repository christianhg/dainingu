(function () {
	'use strict';

	var sequelize = require("../config/sequelize");

	var Dish = sequelize.model('dish');

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

	exports.index = function(req, res, callback) {
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
	};

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

	exports.store = function(req, res, callback) {
		var name = req.body.name;

		var dish = Dish.build({
			name: name
		});

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

				res.json(dish);

				callback(data);
			});
	};

	exports.update = function(req, res, callback) {
		var id = req.params.id;
		var name = req.body.name;
		var menuId = req.body.menuId;

		Dish.find({ where: { id: id }})
			.complete(function(err, dish) {
				if(!!err) {
					res.send(err);
				}

				dish.updateAttributes({
					name: name,
					menuId: menuId
				}).success(function() {
					var data = {
						message: 'Dish updated',
						dish: dish
					};

					res.json(dish);

					callback(data);
				});
			});
	};
})();