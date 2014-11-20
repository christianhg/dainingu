(function () {
	'use strict';

	var sequelize = require("../config/sequelize");
	var Dish = sequelize.model('dish');
	var Menu = sequelize.model('menu');

	exports.index = function(req, res, callback) {
		var id = req.params.id;

		Menu.find({ where: { id: id }})
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

	exports.store = function(req, res, callback) {
		var id = req.params.id;
		var dish = req.body;

		Menu.find({ where: { id: id }})
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

						console.log(dish);

						res.json(dish);

						callback(data);
					});
				});


			});
	};

})();