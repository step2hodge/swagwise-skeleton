(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    app.controller('SwagController', function($scope, SwagService) {

        $scope.swagSearch = '';

        SwagService.swag()
            .then(function(response) {

                $scope.swag = response.data;
        });

    });

})(window.angular);