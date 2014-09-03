sponApp.controller('DestinationCtrl', ['$scope','destinationsFactory','$routeParams', '$location', 'flash', function($scope, destinationsFactory, $routeParams, $location, flash){

  $scope.submitDestination = function(destination) {
    destinationsFactory.createDestination(destination)
    .success( function(){
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
      $location.path('/profile/'+1)
      flash.success = "Thanks! We've added " + destination.name + "to our list of adventures!"
    })
    .error( function(){
      console.log("OH NO")
    })
  }

}]);
