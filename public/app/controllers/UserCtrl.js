sponApp.controller('UserCtrl', ['$scope','usersFactory', '$routeParams', '$location', 'flash', '$cookies', function($scope, usersFactory, $routeParams, $location, flash, $cookies){

  var userId = $routeParams.userId;

  $scope.getUser = function(userId){
    console.log(" I RAN")
    console.log($cookies.currentUserId)
    if (userId == $cookies.currentUserId){
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

  $scope.createUser = function(user){
    usersFactory.createUser(user)
    .success( function(data){
      console.log(data)
      $scope.userSignUpForm.$setPristine();
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
      console.log(user)
      flash.success= "Welcome back " + user.username + "!"
      $(".name").html('<h3>'+ user.username + '</h3>')
      $cookies.currentUserId =user.id;
      console.log("COOKIES!")
      console.log($cookies.currentUserId)
    })
    .error( function(){
      flash.error = "Error logging in. Please double-check your info or reset password."
    })
  }

  $scope.loggedIn = function(){
    if ($cookies.currentUserId !== ""){ return true }
  }

}]);
