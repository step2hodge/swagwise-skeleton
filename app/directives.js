(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .directive('productThumbnail', function(CartService) {

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    swag: '=',
                    swagSearch: '='
                },
                templateUrl: 'templates/product-thumbnail.html',
                link: function(scope) {

                    scope.addItem = function(item) {
                        CartService.addItem(item);
                    };
                }
            };
        })
        .directive('miniCart', function(CartService, $filter) {

            return {
                // Create an isolated scope
                scope: {
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/mini-cart.html',
                link: function(scope) {

                    scope.getMessage = function() {
                        return 'Subtotal: ' + $filter('currency')(CartService.getSubtotal()) + ' - ' + CartService.getItemCount() + ' items';
                    };

                    scope.getSubtotal = function() {
                        return CartService.getSubtotal();
                    };

                    scope.getItemCount = function() {
                        //Returns the item count from the CartService
                        return CartService.getItemCount();
                    };
                }

            };
        });

})(window.angular);