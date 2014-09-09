'use strict';

var sponApp = angular.module('sponApp', ['ngRoute', 'google-maps', 'angular-flash.service', 'angular-flash.flash-alert-directive']);

// ROUTES
sponApp.config(['$routeProvider', '$locationProvider', 'flashProvider', function ($routeProvider, $locationProvider, flashProvider){
  // HashBang Hacky Fix
  $routeProvider
    .when('/', {
       templateUrl: "app/views/home.html",
       // controller: " ",
       // Add our redirection handler, normally this is used
       // in otherwise routes, but we can co-opt it here
       redirectTo: function(current, path, search){
         if(search.goto){
           // if we were passed in a search param, and it has a path
           // to redirect to, then redirect to that path
           return "/" + search.goto
         }
         else{
           // else just redirect back to this location
           // angular is smart enough to only do this once.
           return "/"
         }
       }
     })
    .when('/declan',
      {
        controller: '',
        templateUrl: 'app/views/declan.html'
      })
    .when('/signup',{
      controller: 'UserCtrl',
      templateUrl: 'app/views/sign_up.html'
    })
    .when('/about',{
      controller: '',
      templateUrl: 'app/views/about.html'
    })
    .when('/login',{
      controller: 'UserCtrl',
      templateUrl: 'app/views/login.html'
    })
    .when('/logout',{
      controller: 'LogoutCtrl',
      template: ' '
    })
    .when('/profile',{
      controller: 'ProfileCtrl',
      template: ' '
    })
    .when('/profile/:userId',{
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
