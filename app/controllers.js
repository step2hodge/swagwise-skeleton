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

            $scope.product = SwagService.swag.get({ id: $stateParams.id });

        });

})(window.angular);