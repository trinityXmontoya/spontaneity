// var googleMaps = function(){
//
//   directions: "dog",
//
//   init: function(directions){
//     var counter = 0;
//     var markers = [];
//     var pos;
//   },
//
//   displayDirection = function(){    $(".directions").html(this.directions[0][counter].instructions)
// },
//
//
// }
//
//
//
//
//
//   // *** Click listeners ***
//
//
//
//   $(document).on('click','button.matrix', function(){
//     $.ajax({
//         url:'http://open.mapquestapi.com/directions/v2/routematrix?key=APIKEYHERE&routeType=multimodal&json={locations:[{latLng:{lat:40.667187,lng:-73.976432}},{latLng:{lat:40.706086,lng:-73.996864}},{latLng:{lat:40.742037,lng:-73.987563}},{latLng:{lat:40.748441,lng:-73.985664}}],options:{allToAll:false,manyToOne:true}}',
//         dataType: 'json',
//         method: 'GET'
//       }).done(function(results){
//         console.log("results", results);
//       })
//   })
//
//   function deleteMarkers() {
//     $.each(markers, function(i, marker) {
//       marker.setMap(null);
//     })
//     markers = [];
//   }
//
//     function dropPins(map, start, end) {
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
//     }
//
//   function displayMap(lat, lng, start, end) {
//     var latlng = new google.maps.LatLng(lat, lng);
//     console.log("latlng", latlng);
//     var mapOptions = {
//       zoom: 16,
//       styles: mapStyles,
//       center: latlng,
//       mapTypeControl: false,
//       panControl: false,
//       zoomControl: false
//     };
//
//   var map = new google.maps.Map($(".map_display_canvas")[0], mapOptions);
//
//   dropPins(map, start, end);
//
//       // Next button. Adds to counter to iterate through steps of journey
//   $(document).on('click','button.next', function(){
//     if (counter < directionsList[0].length-1){
//       counter ++;
//       displayDirection();
//       deleteMarkers();
//       dropPins(map, directionsList[0][counter].start_point, directionsList[0][counter].end_point);
//     }
//   })
//
//   // Previous button
//   $(document).on('click','button.previous', function(){
//     if (counter > 0) {
//       counter --;
//       displayDirection();
//       deleteMarkers();
//       dropPins(map, directionsList[0][counter].start_point, directionsList[0][counter].end_point);
//     }
//   })
//
//   }
//
//   function displayProfileMap(lat, lng, start, end) {
//     var latlng = new google.maps.LatLng(lat, lng);
//     console.log("latlng", latlng);
//     var mapOptions = {
//       zoom: 16,
//       styles: mapStyles,
//       center: latlng,
//       mapTypeControl: false,
//       panControl: false,
//       zoomControl: false
//     };
//
//   var map = new google.maps.Map($(".profile_map_canvas")[0], mapOptions);
//
//   }
//
//
//
//   var mapStyles = [
//   {
//     "featureType": "administrative.country",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "administrative.province",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "administrative.locality",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "administrative.neighborhood",
//     "elementType": "geometry",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "administrative.land_parcel",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "landscape.man_made",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F9FFE6" }
//     ]
//   },{
//     "featureType": "landscape.natural.terrain",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#73A341" }
//     ]
//   },{
//     "featureType": "landscape.natural.landcover",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#73A341" }
//     ]
//   },{
//     "featureType": "poi.attraction",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.business",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.government",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.medical",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#73A341" }
//     ]
//   },{
//     "featureType": "poi.place_of_worship",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.school",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "poi.sports_complex",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#EFCB50" }
//     ]
//   },{
//     "featureType": "road.highway.controlled_access",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#A64D3C" }
//     ]
//   },{
//     "featureType": "road.arterial",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#F2A25E" }
//     ]
//   },{
//     "featureType": "road.local",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#D4CAC1" }
//     ]
//   },{
//     "featureType": "transit.line",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#95A5B9" }
//     ]
//   },{
//     "featureType": "transit.station.airport",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#95A5B9" }
//     ]
//   },{
//     "featureType": "transit.station.bus",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#95A5B9" }
//     ]
//   },{
//     "featureType": "transit.station.rail",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#95A5B9" }
//     ]
//   },{
//     "featureType": "water",
//     "elementType": "geometry.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#69D1EE" }
//     ]
//   },{
//     "featureType": "administrative.country",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#808080" }
//     ]
//   },{
//     "featureType": "road.local",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       { "visibility": "on" },
//       { "color": "#590D05" }
//     ]
//   },{
//     "featureType": "road.local",
//     "elementType": "labels.icon",
//     "stylers": [
//       { "color": "#69D1EE" },
//       { "visibility": "on" }
//     ]
//   }
// ];
//
// });
//
//
//
// </script>
