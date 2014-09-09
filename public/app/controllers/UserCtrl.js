sponApp.controller('UserCtrl', ['$scope', '$rootScope', 'usersFactory', '$routeParams', '$location', 'flash', function($scope, $rootScope, usersFactory, $routeParams, $location, flash){

  var userId = $routeParams.userId;

  $scope.getUser = function(){
    console.log(" I RAN")
    console.log($rootScope.currentUserId)
    if (userId == $rootScope.currentUserId){
      usersFactory.getUser(userId)
      .success( function(data){
        $scope.user = data
      })
      .error( function(data){
        console.log("oh no guyzzz: " + data)
      })
    }
    else {
      $location.path('/home')
      flash.error = "You are not authorized to access that page."
    }
  };

  $scope.submitForm = function(form){
    var isValid = form.$valid
    if (isValid){
      if(form.$name == "signUpForm"){
        $scope.createUser($scope.user)
      }
      else if (form.$name == "loginForm"){
        $scope.signIn($scope.user)
      }
    }
  };

  $scope.createUser = function(user){
    usersFactory.createUser(user)
    .success( function(data){
      console.log(data)
      $scope.signUpForm.$setPristine();
      $scope.user = {};
      $location.path('/signin');
      flash.success = 'Succesfully signed up, please login';
    })
    .error( function(data){
      console.log("there seems to have been an error")
      flash.error = 'There was an error with your entered info, please double check.';
    })
  };

  $scope.signIn = function(userInfo){
    usersFactory.signIn(userInfo)
    .success( function(user){
      $location.path('/profile/'+user.id)
      flash.success= "Welcome back " + user.username + "!"
      $(".name").html('<h3>'+ user.username + '</h3>')
      $rootScope.currentUserId =user.id;
    })
    .error( function(){
      flash.error = "Error logging in. Please double-check your info or reset password."
    })
  }

  $scope.loggedIn = function(){
    if ($rootScope.currentUserId !== ""){ return true }
  }

  $scope.validate = function(input){
    if ( $(input.target).hasClass("email")){
      usersFactory.validate("email",input)
    }
    else if ( $(input.target).hasClass("username")){
      usersFactory.validate("username",input)
    }
  }

}]);
