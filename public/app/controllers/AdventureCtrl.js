sponApp.controller('AdventureCtrl', ['$scope', '$routeParams', '$location','adventuresFactory', 'Directions', 'googleMaps', 'flash', function($scope, $routeParams, $location, adventuresFactory, Directions, googleMaps, flash){

  $scope.directions = Directions;

  $scope.locationAddrVerification =  function(){
    $('form[name=newAdventureForm]').LiveAddress({
      key: "982004215141362080",
      debug: true,
      invalidMessage: "Address not valid",
      addresses: [{
        street: 'input[name=location]'
      }]
    });
    $('.smarty-tag').remove();
    $('input[name=location]').css('background','#F9FFE6')[0].placeholder="LOCATION"
  };

  $scope.submitForm = function(form){
    if (form.$valid){
      $scope.submitAdventure($scope.adventure);
    }
  };

  $scope.submitAdventure = function(adventure){
    adventuresFactory.createAdventure(adventure)
    .success( function(data){
      $location.path('/begin')
      $scope.directions.adventure_id = data.adventure_id
      $scope.directions.steps = data.directions.steps
      $scope.directions.name = data.destination
    })
    .error( function(){
      $location.path('/new_adventure')
      flash.error = "Error beginning your adventure, please try again!"
    })
  };

  $scope.getCoords = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var start = lat + ", " + lng;
      var loc_input = $('input[name=location]')
      loc_input.val(start);
      loc_input.trigger('input');
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
        streetViewControl: false
  };

  $scope.counter = 0;

  $scope.completeAdventure = function(){
    var adventure_id = $scope.directions.adventure_id
    adventuresFactory.completeAdventure(adventure_id)
    .success(function(){
      $scope.counter = 0;
      $location.path('/complete')
    })
    .error( function(){
      console.log("ERROR SAVING")
    })
  };

  $scope.$watch('counter', function(){
    if ($scope.directions.steps != undefined) {
      directionsLength = $scope.directions.steps.length
      if ($scope.counter == directionsLength){
        $scope.completeAdventure();
      }
      else {
        displayCurrentDirections();
      }
    }
  });

  $scope.displayFinalMsg = function(){
    $(".destination_name").html("at "+"<br>"+ $scope.directions.name +"!");
  }

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

}])
