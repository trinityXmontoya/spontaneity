sponApp.controller('DestinationCtrl', ['$scope','destinationsFactory','$routeParams', function($scope, destinationsFactory, $routeParams){

  $scope.submitDestination = function(destination) {
    destinationsFactory.createDestination(destination)
    .success( function(){
      console.log("we did it!")
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
    })
    .error( function(){
      console.log("OH NO")
    })
  }

}]);
