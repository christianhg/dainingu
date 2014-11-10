(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('menus', menus);

	function menus() {
		var service = {
			query: query
		};

		function query () {
			var allMenus = [
				{
					title: 'Forretter',
					dishes: [
						'De 5 små',
						'Carpaccio'
					]
				},
				{
					title: 'Grillretter',
					dishes: [
						'BQ Specialstreak',
						'Peberbøf'
					]
				},
				{
					title: 'Tilbehør',
					menus: [
						{
							title: 'Vælg én',
							dishes: [
								'Råstegte kartofler',
								'Pommes frites'
							]
						},
						{
							title: 'Samt en sauce',
							dishes: [
								'Peber sauce',
								'Barbecue sauce'
							]
						}
					]
				},
				{
					title: 'Salater',
					dishes: [
						'Græsk salat',
						'Mozzarella salat'
					]
				},
				{
					title: 'Børnemenu',
					dishes: [
						'BQ Specialsteak',
						'Hakkebøf'
					]
				},
				{
					title: 'Dessert',
					dishes: [
						'Blødende chokoladekage',
						'Crème Brûlée'
					]
				}
			];

			return allMenus;
		}

		return service;
	}

})();