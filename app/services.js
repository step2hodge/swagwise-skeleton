(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .factory('SwagService', function($resource) {

            var service = {

                swag: $resource('/api/swag/:id')

            };

            return service;

        })
        .factory('CartService', function() {

            // Private
            var cart = {};

            var service = {

                getCart: function() {
                    return cart;
                },

                getItemCount: function() {
                    var count = 0;
                    angular.forEach(cart, function(value) {
                        count++;
                    });
                    return count;
                },

                getSubtotal: function() {
                    var subtotal = 0;
                    angular.forEach(cart, function(value, key) {
                        var item = cart[key];
                        subtotal += item.price * item.quantity;
                    });
                    return subtotal;
                },

                getTotal: function() {
                    // TODO Add taxes and S&H logic
                    return service.getSubtotal();
                },

                addItem: function(item) {
                    if (cart[item.id]) {
                        cart[item.id].quantity++;
                    } else {
                        cart[item.id] = item;
                    }
                },

                removeItem: function(id) {
                    delete cart[id];
                },

                emptyCart: function() {
                    cart.length = 0;
                },

                checkout: function() {

                }

            };

            return service;
        });

})(window.angular);