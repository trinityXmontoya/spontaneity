'use strict';

var SponApp = angular.module('SponApp', ['ngRoute']);

// ROUTES

SponApp.config(['$routeProvider', function ($routeProvider){
// give path, view, controller
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
    .otherwise({ redirectTo: '/' });
}]);
