sponApp.controller('UserCtrl', ['$scope','usersFactory', '$routeParams', '$location', 'flash', '$cookieStore', function($scope, usersFactory, $routeParams, $location, flash, $cookieStore){

  var userId = $routeParams.userId;

  $scope.getUser = function(userId){
    console.log(" I RAN")
    console.log($cookieStore.get('current_user_id'))
    if (userId == $cookieStore.get('current_user_id')){
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
      $cookieStore.put('current_user_id',user.id);
      console.log("COOKIES!")
      console.log($cookieStore.get('current_user_id'))
    })
    .error( function(){
      flash.error = "Error logging in. Please double-check your info or reset password."
    })
  }

  $scope.loggedIn = function(){
    if ($cookieStore.get('current_user_id') != ""){ return true }
  }

  $scope.loggedOut = function(){
    if ($cookieStore.get('current_user_id')=="7"){ return true }
  }

}]);
