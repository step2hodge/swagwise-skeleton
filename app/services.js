(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .factory('SwagService', function($resource) {

            return {

                swag: $resource('/api/swag')

            };

        });

})(window.angular);