sponApp.controller('DestinationCtrl', ['$scope','destinationsFactory','$routeParams', '$location', 'flash', function($scope, destinationsFactory, $routeParams, $location, flash){

  $scope.submitForm = function(isValid){
    if (isValid){
      $scope.submitDestination($scope.destination)
      $scope.destinationForm.$setPristine();
    }
  };

  $scope.submitDestination = function(destination) {
    destinationsFactory.createDestination(destination)
    .success( function(){
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
      $location.path('/profile/'+1)
      flash.success = "Thanks! We've added " + destination.name + "to our list of adventures!"
    })
    .error( function(data){
      console.log(data)
     if (data.lat){
      flash.error = "Sorry! This destination already exists"
     }
     else if (data.name){
      flash.error = "You must provide a name for the destination."
     }
     else {
      flash.error = "You must provide an address."
     }

    })
  };

}]);
