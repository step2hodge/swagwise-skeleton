(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .directive('productThumbnail', function() {

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    swag: '=',
                    swagSearch: '='
                },
                templateUrl: 'templates/product-thumbnail.html'
            };
        });

})(window.angular);