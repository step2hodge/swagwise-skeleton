(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    //app.provider

    //app.service

    app.factory('SwagService', function($resource) {

        return $resource('/api/swag/:id');

    });

})(window.angular);