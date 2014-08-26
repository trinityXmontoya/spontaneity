// google.maps.event.addDomListener(window, 'load', initialize);
$(function() {
  var directionsService = new google.maps.DirectionsService();
  var directionsList = [];
  var counter = 0;

  function initialize() {

    // Get current position
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      console.log("pos", pos);
    });

    var start = "chicago, il";
    var end = "gallup, nm";
    console.log("start", start);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsList.push(response.routes[0].legs[0].steps)
        displayDirection();
        console.log("response", response.routes[0].legs[0].steps[0].instructions);
      }
    });
  }

  // Display the current direction in the list.
  function displayDirection() {
    $(".directions").html(directionsList[0][counter].instructions)
  }

  $(".declan").on("click", function(){
    console.log("clicked");
    initialize();
  })

  $(document).on('click','button.next', function(){
      counter ++;
      displayDirection();
  })

  $(document).on('click','button.previous', function(){
    if (counter > 0) {
      counter --;
      displayDirection();
    }
  })

});

