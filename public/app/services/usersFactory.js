sponApp.factory('usersFactory', ['$http', function($http){
  var factory = {};

  factory.getUser = function(userId){
    return $http.get('/users/'+userId)
  }

  factory.createUser = function(userParams){
    return $http.post('/users', {"user": userParams})
  }
  return factory;

}])
