sponApp.controller('AdventureCtrl', ['$scope', '$routeParams', '$location','adventuresFactory', 'Directions', function($scope, $routeParams, $location, adventuresFactory, Directions){

  $scope.directions = Directions;

  $scope.submitAdventure = function(adventure){
    // subtract 15 minutes from the given time frame to allow user time to *experience* the location
    adventure.time_limit -= 15
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $location.path('/begin')
      $scope.directions.steps = data.steps
    })
    .error( function(){
      console.log("ERROR: " + "e")
    })
  }

}])
