(function () {
	'use strict';

	var sequelize = require("../../config/sequelize");
	var Sequelize = sequelize.Seq();

	module.exports = {
		model: {
			name: Sequelize.STRING,
			description: Sequelize.TEXT,
			price: Sequelize.DECIMAL(6,2),
			stock: Sequelize.INTEGER
		},
		relations: {
			belongsTo: "menu"
		},
		options: {
			tableName: 'dishes'
		}
	}
})();