(function(angular) {
    "use strict";

    angular.module("Swagwise")
        .controller("SwagController", function($scope, SwagService) {

            $scope.swagSearch = '';

            $scope.swag = SwagService.swag.query();
        });

})(window.angular);