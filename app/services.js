(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    //app.provider

    //app.service

    app.factory('SwagService', function($resource) {

        return $resource('/api/swag/:id');

    });

    // Inject in $cookieStore, SwagService and app config
    app.factory('CartService', function($cookieStore, SwagService) {

        // Private items object
        var items = {};

        // Angular factories return service objects
        return {

            getItems: function() {
                // Initialize itemsCookie variable
                var itemsCookie;
                // Check if items object has been populated
                if(!items.length) {
                    // Populate items object from cookie
                    itemsCookie = $cookieStore.get('items');
                    // Check if cookie exists
                    if(itemsCookie) {
                        // Loop through cookie and get the item by it's id
                        angular.forEach(itemsCookie, function(quantity, id) {
                            // Add each item to the items object and set it's quantity
                            SwagService.get({id: id}, function(product) {
                                // Update the quantity to the quantity saved in the cookie
                                product.quantity = parseInt(quantity);
                                // Add the product to the cart items object using the guid as the key
                                items[product.id] = product;
                            });
                        });

                    }
                }

                // Return the items object
                return items;
            },

            addItem: function(item) {
                // TODO if we have time, add ability to specify quantity when adding item
                // Checks if item already exists
                if (items[item.id]) {
                    // If it exists, updates the quantity
                    items[item.id].quantity = parseInt(items[item.id].quantity) + 1;
                } else {
                    // If it doesn't exist, adds quantity property with value of 1 then
                    item.quantity = 1;
                    // Add the item onto the items collection
                    items[item.id] = item;
                }

                // Update cookie
                this.updateItemsCookie();
            },

            removeItem: function(id) {
                // Removes an item from the items object
                delete items[id];
                // Update cookie
                this.updateItemsCookie();
            },

            emptyCart: function() {
                // Re-initialize items object to an empty object
                items = {};
                // Remove items cookie using $cookieStore
                $cookieStore.remove('items');
            },

            getItemCount: function() {
                // Initialize total counter
                var total = 0;
                // Loop through items and increment the total by the item quantity
                angular.forEach(items, function(item) {
                    total += parseInt(item.quantity) || 1;
                });
                // Returns number of items, including item quantity
                return total;
            },

            getCartSubtotal: function() {
                // Initialize the total counter
                var total = 0;
                // Loop through the items and multiply the quantity by the item price and increment the total
                angular.forEach(items, function(item) {
                    var price = item.specialPrice? parseFloat(item.specialPrice) : parseFloat(item.price);
                    var quantity = parseInt(item.quantity);
                    total += price * quantity;
                });
                // Return the item quantity times item price for each item in the array
                return total;
            },

            getCartTotal: function() {
                return this.getCartSubtotal();
            },

            checkout: function() {
                // Implement the checkout
            },

            updateItemsCookie: function() {
                // Initialize an object to be saved as the cookie
                var itemsCookie = {};
                // Loop through the items in the cart
                angular.forEach(items, function(item, key) {
                    // Add each item to the items cookie,
                    // using the id as the key and the quantity as the value
                    itemsCookie[key] = item.quantity;
                });
                // Use the $cookieStore service to persist the itemsCookie object to the cookie named 'items'
                $cookieStore.put('items', itemsCookie);
            }

        };

    });

})(window.angular);