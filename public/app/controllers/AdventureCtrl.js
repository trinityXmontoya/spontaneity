sponApp.controller('AdventureCtrl', ['$scope', '$routeParams', '$location','adventuresFactory', 'Directions', 'googleMaps', function($scope, $routeParams, $location, adventuresFactory, Directions, googleMaps){

  $scope.directions = Directions;

  $scope.submitAdventure = function(adventure){
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $location.path('/begin')
      $scope.directions.steps = data.steps
      $scope.setMap();
      // googleMaps.init($scope.directions)
    })
    .error( function(){
      console.log("ERROR: " + "e")
      $location.path('/new_adventure')
    })
  };

  $scope.setMap = function(){
    $scope.map =
      {
        center: currentCenter,
        pan: false,
        zoom: 16,
        options: {
          // styles: googleMaps.mapStyles,
          zoomControl: false,
          mapTypeControl: false,
          panControl: false,
          backgroundColor: "purple",
          minZoom: 14,
          streetViewControl: false
        }
    }
  }

  $scope.counter = 0;

  $scope.currentCenter = {
        // latitude: $scope.directions.steps[this.counter]["start_location"]["lat"],
        // longitude: $scope.directions.steps[this.counter]["start_location"]["lng"]
  }

}])
