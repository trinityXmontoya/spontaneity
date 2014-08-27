sponApp.factory('destinationsFactory', ['$http', function($http){
  var factory = {};

  factory.createDestination = function(destinationParams){
    return $http.post('/destinations', {"destination": destinationParams})
  }

  return factory;
}])
