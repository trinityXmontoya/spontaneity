'use strict';

var sponApp = angular.module('sponApp', ['ngRoute']);

// ROUTES

sponApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){

  $routeProvider
    .when('/declan',
      {
        controller: '',
        templateUrl: 'app/views/declan.html'
      })
    .when('/trinity',
      {
        controller: '',
        templateUrl: 'app/views/trinity.html'
      })
    .when('/new_adventure',
    {
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/new_adventure.html'
    })
    .when('/submit_adventure',
    {
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/submit_adventure.html'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
}]);
