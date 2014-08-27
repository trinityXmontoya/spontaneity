sponApp.factory('adventuresFactory', ['$http', function($http){

  var factory = {};

  factory.createAdventure = function(){
    return $http.post('/adventures')
  }

}])
