(function(angular) {
    "use strict";

    angular.module('Swagwise')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    controller: 'HomeController',
                    templateUrl: 'views/home.html'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'views/contact.html'
                })
                .state('swag', {
                    url: '/swag',
                    controller: 'SwagController',
                    templateUrl: 'views/swag.html'
                })
                .state('detail', {
                    url: '/swag/:id',
                    controller: 'DetailController',
                    templateUrl: 'views/detail.html'
                })
                .state('cart', {
                    url: '/cart',
                    controller: 'CartController',
                    templateUrl: 'views/cart.html'
                })
                .state('login', {
                    url: '/login',
                    controller: 'LoginController',
                    templateUrl: 'views/login.html'
                })
                .state('signup', {
                    url: '/signup',
                    controller: 'SignupController',
                    templateUrl: 'views/signup.html'
                });

        });

})(window.angular);