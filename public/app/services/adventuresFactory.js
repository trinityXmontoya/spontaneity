sponApp.factory('adventuresFactory', ['$http', function($http){

  var factory = {};

  factory.createAdventure = function(adventureParams){
    return $http.post('/adventures', {adventure: adventureParams})
  }

  factory.completeAdventure = function(adventureId){
    return $http.put('/adventures/'+adventureId+'/complete')
  }

  return factory;
}])
