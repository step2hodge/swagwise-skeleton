(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .factory('AuthService', function($rootScope, $resource, $cookieStore) {

            $rootScope.user = $cookieStore.get('user');

            return {

                signup: $resource('/api/signup'),

                login: $resource('/api/login'),

                logout: $resource('/api/logout'),
                
                getUser: function() {
                    return $cookieStore.get('user');
                },

                removeUser: function() {
                    $cookieStore.remove('user');
                }
            };
        })
        .factory('SwagService', function($resource) {

            var service = {

                swag: $resource('/api/swag/:id')

            };

            return service;

        })
        .factory('CartService', function($cookieStore, SwagService, $q, $state, $resource) {

            // Private
            var cart = {};

            var service = {

                getCart: function() {

                    var cookieCount = 0;
                    var deferred = $q.defer();

                    if (service.getItems().length) {

                        deferred.resolve();
                    } else {

                        // Loop through the cookie to get a property count
                        angular.forEach($cookieStore.get('cart'), function() {
                            cookieCount ++;
                        });

                        angular.forEach($cookieStore.get('cart'), function(quantity, id) {
                            SwagService.swag.get({id: id}).$promise.then(function(product) {
                                // Add the quantity from the cookie
                                product.quantity = quantity;
                                // Add the updated product to the cart
                                cart[id] = product;

                                // If the cookieCount is back to zero and all AJAX requests have completed
                                if(--cookieCount == 0) {
                                    deferred.resolve();
                                }
                            });
                        });
                    }

                    return deferred.promise;
                },

                getItems: function() {
                    var items = [];
                    angular.forEach(cart, function(item) {
                        items.push(item);
                    });
                    return items;
                },

                getItemCount: function() {
                    var count = 0;
                    angular.forEach(service.getItems(), function(item) {
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

                confirmCheckout: function() {
                    $state.go('checkout');
                },

                checkout: function(card) {

                    // Get the user
                    var user = $cookieStore.get('user');

                    // Set up the data
                    var data = {
                        amount: service.getTotal(),
                        customer_id: user ? user.customer_id : null
                    };

                    // Merge card and data
                    angular.extend(data, card);

                    // Checkout with API
                    $resource('/api/checkout').save(data)
                        .$promise
                        .then(
                        function(response) {
                            alert("Order processed");
                        }
                    );

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