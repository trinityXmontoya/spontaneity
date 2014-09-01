sponApp.factory('adventuresFactory', ['$http', function($http){

  var factory = {};

  factory.createAdventure = function(adventureParams){
    return $http.post('/adventures', {adventure: adventureParams})
  }

  return factory;
}])
