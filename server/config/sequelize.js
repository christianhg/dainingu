(function () {
	'use strict';

	var filesystem = require('fs');
	var models = {};
	var relationships = {};

	var Singleton = function singleton() {
		var Sequelize = require('sequelize');
		var sequelize = null;
		var modelsPath = '';

		this.setup = function (path, database, username, password, obj){
			modelsPath = path;

			if(arguments.length === 3){
				sequelize = new Sequelize(database, username);
			}
			else if(arguments.length === 4){
				sequelize = new Sequelize(database, username, password);
			}
			else if(arguments.length === 5){
				sequelize = new Sequelize(database, username, password, obj);
			}

			sequelize.sync();

			init();
		};

		this.model = function (name){
			return models[name];
		};

		this.Seq = function (){
			return Sequelize;
		};

		function init() {
			filesystem.readdirSync(modelsPath).forEach(function(name){

				var object = require(modelsPath + '/' + name);
				var options = object.options || {};
				var modelName = name.replace(/\.js$/i, '');
				models[modelName] = sequelize.define(modelName, object.model, options);
				if('relations' in object){
					relationships[modelName] = object.relations;
				}
			});

			for(var name in relationships) {
				if(relationships.hasOwnProperty(name)) {
					var relation = relationships[name];
					for(var relName in relation) {
						if(relation.hasOwnProperty(relName)) {
							var related = relation[relName];
							models[name][relName](models[related]);
						}
					}
				}
			}
		}
	};

	Singleton.instance = null;

	Singleton.getInstance = function(){
		if(this.instance === null){
			this.instance = new Singleton();
		}
		return this.instance;
	};

	module.exports = Singleton.getInstance();

})();