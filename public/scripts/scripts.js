$(function() {

  var directionsService = new google.maps.DirectionsService();
  // So we only have to hit the Google Maps Directions API once for each 'adventure', I'm pushing it into an array. Then we cycle through steps one by one with next and previous click listeners below.
  var directionsList = [];
  // There's probably a much more elegant way to do this, but using a counter to cycle through the steps in the journey.
  var counter = 0;

  var pos;

      // newMap: function(ev){
      // var mapInput = $(ev.currentTarget).serializeObject();
      // $(ev.currentTarget).val('');
      // var mapName = mapInput.map_name;
      // var Map = new Comb.Models.Map({
      // // var Map = ({
      //   name: mapName,
      //   creator_id: responseUserId,
      //   user_id: responseUserId,
      //   map_lat:'',
      //   map_long:'',
      //   pins:''
      // });
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
            displayDirection();
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

 // Get Google Maps directions upon click of 'declan'
  // $(document).on("submit","form.location_form", function(){
  //   initialize();
  // })

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
        url:'http://open.mapquestapi.com/directions/v2/routematrix?key=Fmjtd%7Cluur250zl1%2C85%3Do5-9w2l0r&json={locations:[{latLng:{lat:54.0484068,lng:-2.7990345}},{latLng:{lat:53.9593817,lng:-1.0814175}},{latLng:{lat:53.9593817,lng:-1.0514175}},{latLng:{lat:53.9593817,lng:-1.0114175}}],options:{allToAll:false}}',
        dataType: 'json',
        method: 'GET'

        // {
        //        locations:
        //          [
        //           {latLng:{lat: 54.0484068, lng: -2.7990345}},
        //           {latLng:{lat: 53.9593817, lng: -1.0814175}},
        //           {latLng:{lat: 53.9593817, lng: -1.0514175}},
        //           {latLng:{lat: 53.9593817, lng: -1.0114175}}
        //          ]
        //       }
      }).done(function(results){
        console.log("results", results);
      })
  })

});

