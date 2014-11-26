(function () {
    'use strict';

    angular
        .module('dainingu')
        .factory('activeOrder', activeOrder);

    function activeOrder($window) {
        return {
            'set': function(orderId) {
                $window.sessionStorage.activeOrder = orderId;
            },
            'get': function() {
                if($window.sessionStorage.activeOrder) {
                    return $window.sessionStorage.activeOrder;
                } else {
                    return false;
                }
            },
            'delete': function() {
                delete $window.sessionStorage.activeOrder;
            },
            'check': function(orderId) {
                if($window.sessionStorage.activeOrder) {
                    if(orderId = $window.sessionStorage.activeOrder) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
    }
})();