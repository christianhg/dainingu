/**
 * Menus Factory
 * @namespace Factories
 */
(function () {
	'use strict';

	angular
		.module('dainingu')
		.factory('menus', menus);

	function menus($resource) {
		return $resource('/api/menus/:id', { id: '@id' }, {
			'save': {
				method: 'POST',
				isArray: false
			},
			'update': {
				method: 'PUT',
				isArray: false
			},
			'delete': {
				method: 'DELETE',
				isArray: false
			}
		});

		/*var service = {
			query: query
		};

		return service;

		////////////////

		function query () {
			var allMenus = [
				{
					name: 'Forretter',
					dishes: [
						'De 5 små',
						'Carpaccio'
					]
				},
				{
					name: 'Grillretter',
					dishes: [
						'BQ Specialstreak',
						'Peberbøf'
					]
				},
				{
					name: 'Tilbehør',
					menus: [
						{
							name: 'Vælg én',
							dishes: [
								'Råstegte kartofler',
								'Pommes frites'
							]
						},
						{
							name: 'Samt en sauce',
							dishes: [
								'Peber sauce',
								'Barbecue sauce'
							]
						}
					]
				},
				{
					name: 'Salater',
					dishes: [
						'Græsk salat',
						'Mozzarella salat'
					]
				},
				{
					name: 'Børnemenu',
					dishes: [
						'BQ Specialsteak',
						'Hakkebøf'
					]
				},
				{
					name: 'Dessert',
					dishes: [
						'Blødende chokoladekage',
						'Crème Brûlée'
					]
				}
			];

			return allMenus;
		}*/

	}

})();