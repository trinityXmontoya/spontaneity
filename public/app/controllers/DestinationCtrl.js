sponApp.controller('DestinationCtrl', ['$scope','destinationsFactory','$routeParams', '$location', 'flash', function($scope, destinationsFactory, $routeParams, $location, flash){

  $scope.submitDestination = function(destination) {
    destinationsFactory.createDestination(destination)
    .success( function(){
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
      $location.path('/users/'+1)
    })
    .error( function(){
      console.log("OH NO")
    })
  }

}]);
