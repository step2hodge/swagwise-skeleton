(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .controller('SignupController', function($scope, $state, $timeout, AuthService) {

            $scope.user = {};

            $scope.alerts = [];

            $scope.signup = function() {

                AuthService.signup.save($scope.user)
                    .$promise.then(function(response) {

                        $scope.alerts.push({
                            type: 'success',
                            message: 'Account created successfully. Redirecting to login.'
                        });

                        $timeout(function() {

                            $scope.alerts = [];

                            $state.go('login');
                        }, 3000);

                    }, function() {

                        $scope.alerts.push({
                            type: 'danger',
                            message: 'Could not create account. Please try again.'
                        });

                        $timeout(function() {

                            $scope.alerts = [];

                        }, 3000);
                    });
            }
        })
        .controller('LoginController', function($scope, $state, $timeout, AuthService) {

            $scope.user = {};

            $scope.alerts = [];

            $scope.login = function() {

                AuthService.login.save($scope.user)
                    .$promise.then(function(response){

                        $scope.alerts.push({
                            type: 'success',
                            message: 'You have successfully logged in.'
                        });

                        $timeout(function() {

                            $scope.alerts = [];

                            $state.go('home');

                        }, 3000);

                    }, function(response) {

                        $scope.alerts.push({
                            type: 'danger',
                            message: 'There was an error logging you in. Please try again.'
                        });

                        $timeout(function() {

                            $scope.alerts = [];

                        }, 3000);
                    });

            };

        })
        .controller('HomeController', function($scope, SwagService) {

            $scope.featuredSwag = SwagService.swag.query({ isFeatured: true });
        })
        .controller('SwagController', function($scope, SwagService) {

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

            function updateItems() {
                CartService.getCart().then(function() {
                    $scope.items = CartService.getItems();
                });
            }

            updateItems();

            $scope.removeItem = function(id) {
                CartService.removeItem(id);
                updateItems();
            };

            $scope.getItemCount = function() {
                return CartService.getItemCount();
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
                updateItems();
            };

            $scope.checkout = function() {
                CartService.confirmCheckout();
            };

        })
        .controller('CheckoutController', function($scope, CartService) {

            // Add a card object to the scope
            $scope.card = {};

            // Add a checkout function
            $scope.checkout = function() {
                // Checkout using CartService
                CartService.checkout($scope.card);

            };

        });

})(window.angular);