(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .factory('SwagService', function($http) {

            return {

                swag: function() {
                    return $http.get('assets/json/swag.json');
                }

            };

        });

})(window.angular);