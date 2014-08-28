sponApp.controller('DestinationCtrl', ['$scope','destinationsFactory','$routeParams', function($scope, destinationsFactory, $routeParams){

  $scope.submitDestination = function(destination) {
    destinationsFactory.createDestination(destination)
    .success( function(){
      console.log("destination succesfully created!")
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
      // $scope.destinationConfirmedMessage = "Thanks! We've added " + destination.name + "to our list of adventures!"
    })
    .error( function(){
      console.log("OH NO")
    })
  }

}]);
