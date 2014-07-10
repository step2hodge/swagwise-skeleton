(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    app.controller('SwagController', function($scope, SwagService, filterFilter) {

        var items = SwagService.query();

        $scope.swagSearch = '';

        $scope.swag = items;

        $scope.$watch('swagSearch', function(newValue, oldValue) {
            if(newValue) {
                // Filter swag
                // TODO fitler by title doesn't always work, fix it
                $scope.swag = filterFilter(items, newValue, 'title');

            }else {
                // Reset swag
                $scope.swag = items;
            }
        });

    });

    app.controller('ProductDetail', function($scope, $stateParams, SwagService, $interval) {

        var product_id = $stateParams.id;

        $scope.imageInterval = 3000;

        $scope.item = SwagService.get({id: product_id});

    });

})(window.angular);