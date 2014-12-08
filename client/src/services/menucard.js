/**
 * Menucard Factory
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('menucard', menucard);

    function menucard($http, $state, $window) {
        return {
            addDishToOrder: function(orderId, dish, callback) {
                $http.post('/api/menucard/orders/dishes', { orderId: orderId, dish: dish })
                    .success(function(order) {
                        callback(order);
                    })
                    .error(function() {
                        callback(false);
                    });
            },
            addOrder: function(callback) {
                $http.post('/api/menucard/orders')
                    .success(function(order) {
                        callback(order);
                    })
                    .error(function() {
                        callback(false);
                    });
            },
            commitOrder: function(orderId, callback) {
                $http.post('/api/menucard/orders/commit', { orderId: orderId })
                    .success(function(data) {
                        callback(data);
                    })
                    .error(function() {
                        callback(false);
                    });
            },
            getOrders: function(callback) {
                $http.get('/api/menucard/orders')
                    .success(function(orders) {
                        callback(orders);
                    })
                    .error(function() {
                        callback(false);
                    });
            },
            getSession: function(callback) {
                $http.get('/api/menucard/session')
                    .success(function(session) {
                        callback(session);
                    })
                    .error(function() {
                        callback(false);
                    });
            },
            returnOrder: function(orderId, callback) {
                $http.post('/api/menucard/orders/return', { orderId: orderId })
                    .success(function(data) {
                        callback(data);
                    })
                    .error(function() {
                        callback(false);
                    });
            }
        };
    }
})();