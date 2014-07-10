(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    app.directive('rotatingThumbnail', function($interval) {

        return {
            replace: true,
            // Element
            // Attribute
            // Class
            restrict: 'E',
            scope: {
                // @ String
                title: '@',
                // & One-way function
                // = Two-way bound object
                images: '='
            },
            templateUrl: 'templates/rotating-thumbnail.html',
            link: function(scope, element, attributes) {

                var rotator;
                var counter = 0;

                var destroyRotator = function() {
                    if (rotator) {
                        // Cancel rotator
                        $interval.cancel(rotator);
                        // Destroy rotator
                        rotator = undefined;
                        // Reset productImage
                        scope.productImage = scope.images[0];
                        // reset counter
                        counter = 0;
                    }
                };

                scope.productImage = scope.images[0];

                scope.rotateImage = function() {

                    // If rotator exists,
                    // return out of this function
                    if(rotator) {
                        return;
                    }

                    // Create rotator
                    rotator = $interval(function() {
                        // Increment counter
                        counter += 1;
                        // Check if counter has surpassed image array length
                        if (counter == scope.images.length) {
                            // Re-initialize counter to 0
                            counter = 0;
                        }
                        // Set productImage to counter position in image array
                        scope.productImage = scope.images[counter];

                    }, 1500);
                };

                scope.cancelRotator = function() {
                    destroyRotator();
                };

                scope.$on('$destroy', function() {
                    destroyRotator();
                });
            }

        };

    });

})(window.angular);