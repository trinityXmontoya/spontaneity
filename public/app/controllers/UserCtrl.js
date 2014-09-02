sponApp.controller('UserCtrl', ['$scope','usersFactory', '$routeParams', '$location', 'flash', function($scope, usersFactory, $routeParams, $location, flash){

  var userId = $routeParams.userId;

  $scope.getUser = function(userId){
    usersFactory.getUser(userId)
    .success( function(data){
      $scope.user = data
    })
    .error( function(data){
      console.log("oh no guyzzz: " + data)
    })
  }

  $scope.createUser = function(user){
    usersFactory.createUser(user)
    .success( function(data){
      console.log(data)
      $scope.userSignUpForm.$setPristine();
      $scope.user = {};
      $location.path('/users/'+data.id);
      flash.success = 'Succesfully signed up';
    })
    .error( function(data){
      console.log("there seems to have been an error")
      flash.error = 'There was an error with your entered info, please double check.';
    })
  }


}]);
