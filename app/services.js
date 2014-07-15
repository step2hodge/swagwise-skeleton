(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    //app.provider

    //app.service

    app.factory('SwagService', function($resource) {

        return $resource('/api/swag/:id');

    });

    // Inject in $cookieStore, SwagService and app config
    app.factory('CartService', function() {

        // Private items object
        var items = {};

        function updateItemsCookie() {

        }

        // Angular factories return service objects
        return {

            getItems: function() {
                // Initialize itemsCookie variable
                var itemsCookie;
                // Check if items object has been populated
                if(!items.length) {
                    // Populate items object from cookie

                    // Check if cookie exists
                    if(itemsCookie) {
                        // Loop through cookie and get the item by it's id
                        // Add each item to the items object and set it's quantity

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
                    items[item.id].quantity += 1;
                } else {
                    // If it doesn't exist, adds quantity property with value of 1 then
                    item.quantity = 1;
                    // Add the item onto the items collection
                    items[item.id] = item;
                }

                // Update cookie
                updateItemsCookie();
            },

            removeItem: function(id) {
                // Removes an item from the items object
                delete items[id];
                // Update cookie
                updateItemsCookie();
            },

            emptyCart: function() {
                // Re-initialize items object to an empty object
                items = {};
                // Remove items cookie using $cookieStore

            },

            getItemCount: function() {
                // Initialize total counter
                var total = 0;
                // Loop through items and increment the total by the item quantity
                angular.forEach(items, function(item) {
                    total += parseInt(item.quantity);
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
            }

        };

    });

})(window.angular);