$(function() {

  var directionsService = new google.maps.DirectionsService();
  // So we only have to hit the Google Maps Directions API once for each 'adventure', I'm pushing it into an array. Then we cycle through steps one by one with next and previous click listeners below.
  var directionsList = [];
  // There's probably a much more elegant way to do this, but using a counter to cycle through the steps in the journey.
  var counter = 0;

  var pos;

  $(document).on("submit","form.location_form", function(ev){
    var locationInput = $(".location").val();
    console.log("locationInput", locationInput);
    $("location").val('');
  // // Obtain the Google Maps Directions
  // function initialize() {

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

        var end_lat = results.response.venues[0].location.lat;
        var end_long = results.response.venues[0].location.lng;
        var end = end_lat+","+end_long;

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
            console.log("directions list", directionsList);
            displayDirection();
            displayMap(lat, lng, directionsList[0][counter].start_point, directionsList[0][counter].end_point);
          }
        });

      })

    });

  })

  // Display the current direction in the list.
  function displayDirection() {
    $(".directions").html(directionsList[0][counter].instructions)
  }

  // *** Click listeners ***

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

  $(document).on('click','button.matrix', function(){
    $.ajax({
        url:'http://open.mapquestapi.com/directions/v2/routematrix?key=APIKEYHERE&routeType=multimodal&json={locations:[{latLng:{lat:40.667187,lng:-73.976432}},{latLng:{lat:40.706086,lng:-73.996864}},{latLng:{lat:40.742037,lng:-73.987563}},{latLng:{lat:40.748441,lng:-73.985664}}],options:{allToAll:false,manyToOne:true}}',
        dataType: 'json',
        method: 'GET'
      }).done(function(results){
        console.log("results", results);
      })
  })

  function displayMap(lat, lng, start, end) {
    var points = [];
    points.push(start, end)
    var latlng = new google.maps.LatLng(lat, lng);
    console.log("latlng", latlng);
    var mapOptions = {
      zoom: 16,
      center: latlng,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false
    };

    var map = new google.maps.Map($(".map_display_canvas")[0], mapOptions);

    $.each(points, function(i, pin){
      console.log("pin", pin.k);
      pinLat = pin.k;
      pinLng = pin.B;
      var pinLatLng = new google.maps.LatLng(pinLat, pinLng);
          marker = new google.maps.Marker({
          position: pinLatLng,
          map: map,
          draggable:false,
          animation: google.maps.Animation.DROP
      });
    })

  }

});


