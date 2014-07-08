(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    app.controller('SwagController', function($scope, SwagService) {

        $scope.swagSearch = '';

        /*SwagService.swag()
            .then(function(response) {

                $scope.swag = response.data;
        });
        */

        $scope.swag = SwagService.query();

    });

    app.controller('ProductDetail', function($scope, $stateParams, SwagService, $interval) {

        var product_id = $stateParams.id;

        var counter = 1;
        var rotator;

        $scope.item = SwagService.get({id: product_id}, function (item) {

            $scope.productImage = item.images[0];

        });

        $scope.rotateImage = function () {

            if(rotator) {
                return;
            }

            rotator = $interval(function () {
                counter += 1;
                if (counter == $scope.item.images.length) {
                    counter = 0;
                }
                $scope.productImage = $scope.item.images[counter];
            }, 1500);
        };

        $scope.cancelRotator = function () {
            if (rotator) {
                $interval.cancel(rotator);
                rotator = undefined;
            }
        };

    });

})(window.angular);