sponApp.factory("googleMaps", function(){
  var factory = {}

//     directionsList: [],
//     counter: 0,
//     markers: [],
//     lat: 42.3461507,
//     long: -71.1358657,
//     // pos:,

//     init: function(directions){
//       directionsList = directions.steps
//       console.log("directions list", directionsList);
//       this.displayDirection();
//       this.displayMap(this.lat, this.lng, directionsList[this.counter].start_point, directionsList[this.counter].end_point);
//     },

//     // Display the current direction in the list.
//     displayDirection: function() {
//       $(".directions").html(directionsList[this.counter]["html_instructions"])
//     },

//     // *** Click listeners ***

//     deleteMarkers: function() {
//       $.each(markers, function(i, marker) {
//         marker.setMap(null);
//       })
//       markers = [];
//     },

//     dropPins: function(map, start, end) {
//       var points = [];
//       points.push(start, end)
//       var bounds = new google.maps.LatLngBounds();
//       var pathCoords = [];
//       $.each(points, function(i, pin){
//         pinLat = pin.k;
//         pinLng = pin.B;
//         var pinLatLng = new google.maps.LatLng(pinLat, pinLng);
//         pathCoords.push(pinLatLng);
//         marker = new google.maps.Marker({
//             position: pinLatLng,
//             map: map,
//             draggable:false,
//             animation: google.maps.Animation.DROP
//         });
//         markers.push(marker);
//         bounds.extend(marker.position);
//         map.fitBounds(bounds);
//         var path = new google.maps.Polyline({
//           path: pathCoords,
//           geodesic: true,
//           strokeColor: '#69D1EE',
//           // strokeColor: '#E91C30',
//           strokeOpacity: 1.0,
//           strokeWeight: 3
//         });
//         path.setMap(map);
//       })
//     },

//     displayMap: function(lat, lng, start, end) {
//       var latlng = new google.maps.LatLng(lat, lng);
//       console.log("latlng", latlng);
//       var mapOptions = {
//         zoom: 16,
//         styles: this.mapStyles,
//         center: latlng,
//         mapTypeControl: false,
//         panControl: false,
//         zoomControl: false
//       };
//       var map = new google.maps.Map($(".map_display_canvas")[0], mapOptions);

//       this.dropPins(map, start, end);

//           // Next button. Adds to this.counter to iterate through steps of journey
//       $(document).on('click','button.next', function(){
//         var _this = this;
//         if (this.counter < directionsList.length-1){
//           _this.counter ++;
//           _this.displayDirection();
//           _this.deleteMarkers();
//           _this.dropPins(map, _this.directionsList[_this.counter].start_point, directionsList[_this.counter].end_point);
//         }
//       })

//       // Previous button
//       $(document).on('click','button.previous', function(){
//         if (this.counter > 0) {
//           this.counter --;
//           displayDirection();
//           deleteMarkers();
//           dropPins(map, directionsList[this.counter].start_point, directionsList[this.counter].end_point);
//         }
//       })
//     },

    factory.mapStyles = [
      {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "administrative.neighborhood",
        "elementType": "geometry",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F9FFE6" }
        ]
      },{
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#73A341" }
        ]
      },{
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#73A341" }
        ]
      },{
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#73A341" }
        ]
      },{
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#EFCB50" }
        ]
      },{
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#A64D3C" }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#F2A25E" }
        ]
      },{
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#D4CAC1" }
        ]
      },{
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#95A5B9" }
        ]
      },{
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#95A5B9" }
        ]
      },{
        "featureType": "transit.station.bus",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#95A5B9" }
        ]
      },{
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#95A5B9" }
        ]
      },{
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#69D1EE" }
        ]
      },{
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#808080" }
        ]
      },{
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#590D05" }
        ]
      },{
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
          { "color": "#69D1EE" },
          { "visibility": "on" }
        ]
      }
    ]

//   }
  return factory;
});
