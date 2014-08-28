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
    .when('/new_adventure',
    {
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/new_adventure.html'
    })
    .when('/submit_destination',
    {
      controller: 'DestinationCtrl',
      templateUrl: 'app/views/submit_destination.html'
    })
    .when('/begin',{
      controller: 'AdventureCtrl',
      templateUrl: 'app/views/begin_adventure.html'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
}]);
