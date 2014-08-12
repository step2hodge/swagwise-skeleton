(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'views/contact.html'
                });

        });

})(window.angular);