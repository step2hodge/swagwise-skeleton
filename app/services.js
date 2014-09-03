(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .factory('SwagService', function($resource) {

            var service = {

                swag: $resource('/api/swag/:id')

            };

            return service;

        })
        .factory('CartService', function($cookieStore, SwagService) {

            // Private
            var cart = {};

            var service = {

                getCart: function() {
                    var items = [];
                    angular.forEach(cart, function(item) {
                        items.push(item);
                    });
                    return items;
                    /*
                    var cookieItems;
                    if (!cart[0]) {

                        cookieItems = $cookieStore.get('cart');

                        angular.forEach(cookieItems, function(quantity, id) {
                            SwagService.swag.get(
                                {id: id}, function(product) {
                                    // Add the quantity from the cookie
                                    product.quantity = quantity;
                                    // Add the updated product to the cart
                                    cart[id] = product;
                                });
                        });
                    }
                    return service.getItems();
                    */
                },

                getItemCount: function() {
                    var count = 0;
                    angular.forEach(service.getCart(), function(item) {
                        count += item.quantity || 1;
                    });
                    return count;
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
                    // Update the cookie
                    service.updateCookie();
                },

                removeItem: function(id) {
                    // delete the property from the cart
                    delete cart[id];
                    // Update the cookie
                    service.updateCookie();
                },

                emptyCart: function() {
                    // Empty the cart
                    cart = {};
                    // Remove the cart cookie
                    $cookieStore.remove('cart');
                },

                checkout: function() {

                },

                updateCookie: function() {
                    // Initialize an object to be saved as the cookie
                    var itemsCookie = {};

                    /*
                    Resultant cookie looks something like this
                    itemsCookie = {
                        1: 1,
                        3: 5
                    };
                     */
                    // Loop through the items in the cart
                    angular.forEach(cart, function(item, key) {
                        // Add each item to the items cookie,
                        // using the id as the key and the quantity as the value
                        itemsCookie[key] = item.quantity;
                    });
                    // Use the $cookieStore service to persist the itemsCookie object to the cookie named 'cart'
                    $cookieStore.put('cart', itemsCookie);
                }

            };

            return service;
        });

})(window.angular);