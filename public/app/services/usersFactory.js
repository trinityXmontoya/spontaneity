sponApp.factory('usersFactory', ['$http', function($http){
  var factory = {};

  factory.getUser = function(userId){
    return $http.get('/users/'+userId)
  };

  factory.createUser = function(userParams){
    return $http.post('/users', {"user": userParams})
  };

  factory.signIn = function(userInfo){
    return $http.post('/users/verify', {"user": userInfo})
  };

  factory.logout = function(userId){
    return $http.delete('/user_logout/'+userId)
  };

  return factory;

}])
