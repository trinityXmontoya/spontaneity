sponApp.controller('AdventureCtrl', ['$scope', '$routeParams', '$location','adventuresFactory', 'Directions', 'googleMaps', function($scope, $routeParams, $location, adventuresFactory, Directions, googleMaps){

  $scope.directions = Directions;

  $scope.submitAdventure = function(adventure){
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $location.path('/begin')
      $scope.directions.steps = data.steps
      // googleMaps.init($scope.directions)
      // $scope.setMap();
    })
    .error( function(){
      console.log("ERROR: " + "e")
      $location.path('/new_adventure')
    })
  };

  $scope.getCoords = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("current position", position);

      // Get coordinates for current position
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var start = lat+","+lng;
    })
  };

  $scope.map = {
      pan: false,
      zoom: 16,
  };

  $scope.currentCenter = function(){
    start_location = $scope.directions.steps[$scope.counter]["start_location"]
    return {
        latitude: start_location.lat,
        longitude: start_location.lng
      }
  }

  $scope.mapOptions = {
        styles: googleMaps.mapStyles,
        zoomControl: false,
        mapTypeControl: false,
        panControl: false,
        backgroundColor: "purple",
        streetViewControl: false
  };

  $scope.counter = 0;

  $scope.completeAdventure = function(){
    console.log("it's ova baby! BOOYA")
    $scope.counter == 0;
    $location.path('/complete')
  };

  $scope.$watch('counter', function(){
    if ($scope.directions.steps != undefined) {
      directionsLength = $scope.directions.steps.length
      if ($scope.counter == directionsLength){
        $scope.completeAdventure()
      }
      else {
        displayCurrentDirections();
      }
    }
  });

  var displayCurrentDirections = function() {
    var directions = $scope.directions.steps[$scope.counter]["html_instructions"]
    $(".directions").html(directions)
  };

  $scope.markerCoords = function(num){
    if (num == 1){
      start_location = $scope.directions.steps[$scope.counter]["start_location"]
      return {
        latitude: start_location.lat,
        longitude: start_location.lng
      }
    }
    else if (num == 2){
      end_location = $scope.directions.steps[$scope.counter]["end_location"]
      return {
        latitude: end_location.lat,
        longitude: end_location.lng
      }
    }
  };

  $scope.step = function(direction){
    if(direction =='prev'){
      $scope.counter --;
    }
    else if (direction == 'next'){
      $scope.counter ++;
    }
  }

  // $scope.currentCenter = {
  //       latitude: $scope.directions.steps[this.counter]["start_location"]["lat"],
  //       longitude: $scope.directions.steps[this.counter]["start_location"]["lng"]
  // }

}])
