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
                    var items = [];
                    angular.forEach(cart, function(value) {
                        items.push(value);
                    });
                    return items;
                },

                getItemCount: function() {
                    return service.getCart().length;
                },

                getItemPrice: function(item) {
                    return item.isSpecial ? item.specialPrice : item.price;
                },

                getItemSubtotal: function(item) {
                    return service.getItemPrice(item) * item.quantity;
                },

                getSubtotal: function() {
                    var subtotal = 0;
                    angular.forEach(cart, function(value, key) {
                        var item = cart[key];
                        subtotal += parseFloat(item.price) * parseInt(item.quantity);
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
                        item.quantity = 1;
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