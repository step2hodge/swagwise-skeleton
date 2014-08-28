(function(angular) {
    "use strict";

    angular.module("Swagwise")
        .controller("HomeController", function($scope, SwagService) {

            $scope.featuredSwag = SwagService.swag.query({ isFeatured: true });
        })
        .controller("SwagController", function($scope, SwagService) {

            $scope.swagSearch = '';

            $scope.swag = SwagService.swag.query();
        })
        .controller('DetailController', function($scope, $stateParams, SwagService) {

            $scope.carouselSpeed = '3000';

            SwagService.swag.get( { id: $stateParams.id },
                    function(response) {

                        $scope.product = response;

                        $scope.relatedSwag = SwagService.swag.query(
                            {tags: response.tags[0]}
                        );
                    }
                );
        })
        .controller('CartController', function($scope, CartService) {

            $scope.items = CartService.getCart();

            $scope.removeItem = function(id) {
                CartService.removeItem(id);
                $scope.items = CartService.getCart();
            };

            $scope.getItemPrice = function(item) {
                return CartService.getItemPrice(item);
            };

            $scope.getItemSubtotal = function(item) {
                return CartService.getItemSubtotal(item);
            };

            $scope.getSubtotal = function() {
                return CartService.getSubtotal();
            };

            $scope.getTotal = function() {
                return CartService.getTotal();
            };

            $scope.emptyCart = function() {
                CartService.emptyCart();
                $scope.items = CartService.getCart();
            }

        });

})(window.angular);