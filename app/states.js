(function(angular) {
    "use strict";

    var app = angular.module('Swagwise');

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            })
            .state('swag', {
                url: '/swag',
                controller: 'SwagController',
                templateUrl: 'views/swag.html'
            })
            .state('product', {
                url: '/product/:id',
                controller: 'ProductDetail',
                templateUrl: 'views/detail.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html'
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'views/cart.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup.html'
            });

    });

})(window.angular);