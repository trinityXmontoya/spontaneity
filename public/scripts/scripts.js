$(function() {

  var directionsService = new google.maps.DirectionsService();
  // So we only have to hit the Google Maps Directions API once for each 'adventure', I'm pushing it into an array. Then we cycle through steps one by one with next and previous click listeners below.
  var directionsList = [];
  // There's probably a much more elegant way to do this, but using a counter to cycle through the steps in the journey.
  var counter = 0;

  var pos;

  // Obtain the Google Maps Directions
  function initialize() {

    // Get current position
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("current position", position);

      // Get coordinates for current position
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var start = lat+","+lng;

      var beginning_lat = lat.toFixed(1);
      var beginning_long = lng.toFixed(1);
      var beginning = beginning_lat+","+beginning_long;

      $.ajax({
        url:'/places/',
        dataType: 'json',
        method: 'GET',
        data: {latlng: beginning}
      }).done(function(results){
        console.log("data", results);
      })

      var end = "newark, nj";

      // Format the request for the directions
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
      };

      // Make the directions route request
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Push the returned directions into an array
          directionsList.push(response.routes[0].legs[0].steps)
          // Call the displayDirection function below to display one at a time
          displayDirection();
        }
      });

    });

  }

  // Display the current direction in the list.
  function displayDirection() {
    $(".directions").html(directionsList[0][counter].instructions)
  }

  // *** Click listeners ***

 // Get Google Maps directions upon click of 'declan'
  $(".declan").on("click", function(){
    initialize();
  })

  // Next button. Adds to counter to iterate through steps of journey
  $(document).on('click','button.next', function(){
      counter ++;
      displayDirection();
  })

  // Previous button
  $(document).on('click','button.previous', function(){
    if (counter > 0) {
      counter --;
      displayDirection();
    }
  })

});

