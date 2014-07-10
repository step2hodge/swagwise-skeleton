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

        $scope.imageInterval = 3000;

        $scope.item = SwagService.get({id: product_id});

    });

})(window.angular);