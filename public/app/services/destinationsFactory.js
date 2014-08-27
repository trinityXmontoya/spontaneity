sponApp.factory('destinationsFactory', ['$http', function($http){
  var factory = {};

  factory.createDestination = function(destination){
    console.log(' i ran!')
    return $http.post('/destinations', {"destination": destination})
  }

  return factory;
}])
