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
        });

})(window.angular);