'use strict';

var sponApp = angular.module('sponApp', ['ngRoute', 'google-maps']);

// ROUTES

sponApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){

  $routeProvider
    .when('/declan',
      {
        controller: '',
        templateUrl: 'app/views/declan.html'
      })
    .when('/signup',{
      controller: 'UserCtrl',
      templateUrl: 'app/views/sign_up.html'
    })
    .when('/users/:userId',{
      controller: 'UserCtrl',
      templateUrl: 'app/views/profile.html'
    })
    .when('/submit_destination',
    {
      controller: 'DestinationCtrl',
      templateUrl: 'app/views/submit_destination.html'
    })
     .when('/new_adventure',
    {
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/new_adventure.html'
    })
    .when('/begin',{
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/begin_adventure.html'
    })
    .when('/complete',{
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/complete_adventure.html'
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'app/views/home.html'
    });

    $locationProvider.html5Mode(true);
}]);
