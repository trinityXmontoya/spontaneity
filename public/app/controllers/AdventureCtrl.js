sponApp.controller('AdventureCtrl', ['$scope','adventuresFactory', '$routeParams', function($scope, adventuresFactory, $routeParams){

  $scope.submitAdventure = function(adventure){
    // subtract 15 minutes from the given time frame to allow user time to *experience* the location
    adventure.time_limit -= 15
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $scope.directions = data.steps;
    })
    .error( function(){
      console.log("ERROR: " + "e")
    })
  }

}])
