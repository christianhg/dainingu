(function () {
	'use strict';

	var sequelize = require("../../config/sequelize");
	var Sequelize = sequelize.Seq();

	module.exports = {
		model: {
			name: Sequelize.STRING
		},
		relations: {
			belongsTo: "menu"
		},
		options: {
			tableName: 'dishes'
		}
	}
})();