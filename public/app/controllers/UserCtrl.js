sponApp.controller('UserCtrl', ['$scope','usersFactory', '$routeParams', function($scope, usersFactory, $routeParams){

  var userId = $routeParams.userId;

  var init = function(){
    $scope.getUser(userId);
  }

  $scope.getUser = function(userId){
    usersFactory.getUser(userId)
    .success( function(data){
      $scope.user = data
    })
    .error( function(data){
      console.log("oh no guyzzz: " + data)
    })
  }

  init();


}]);
