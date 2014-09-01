sponApp.controller('AdventureCtrl', ['$scope', '$routeParams', '$location','adventuresFactory', 'Directions', 'googleMaps', function($scope, $routeParams, $location, adventuresFactory, Directions, googleMaps){

  $scope.directions = Directions;


  $scope.submitAdventure = function(adventure){
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $location.path('/begin')
      $scope.directions.steps = data.steps
      googleMaps.init($scope.directions)
    })
    .error( function(){
      console.log("ERROR: " + "e")
    })
  };

  $scope.map = {
    center: {
        latitude: 42.3581,
        longitude: 71.0636
    },
    pan: false,
    zoom: 16,
    options: {
      styles: googleMaps.mapStyles,
      zoomControl: false,
      mapTypeControl: false,
      panControl: false,
      backgroundColor: "purple",
      minZoom: 14,
      streetViewControl: false
    }
  };


}])
