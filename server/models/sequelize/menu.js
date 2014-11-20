(function () {
	'use strict';

	var sequelize = require("../../config/sequelize");
	var Sequelize = sequelize.Seq();

	module.exports = {
		model: {
			name: Sequelize.STRING
		},
		relations: {
			hasMany: "dish"
		},
		options: {
			tableName: 'menus'
		}
	}
})();