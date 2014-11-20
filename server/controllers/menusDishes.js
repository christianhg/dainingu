(function () {
	'use strict';

	var sequelize = require("../config/sequelize");
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

					console.log(dishes);

					res.json(dishes);

					callback(data);

				});
			});
	};

})();