(function () {
	'use strict';

	var sequelize = require('../../config/sequelize');
	var Sequelize = sequelize.Seq();

	module.exports = {
		model: {
			name: Sequelize.STRING,
			description: Sequelize.TEXT,
			price: Sequelize.DECIMAL(6,2),
			stock: Sequelize.INTEGER,
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			}
		},
		relations: {
			belongsTo: 'menu'
		},
		options: {
			tableName: 'dishes',
			instanceMethods: {
				activate: function(callback) {
					this.active = true;
					return callback(this.active);
				},
				deactivate: function(callback) {
					this.active = false;
					return callback(this.active);
				}
			}
		}
	};
})();