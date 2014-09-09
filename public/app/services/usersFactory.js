sponApp.factory('usersFactory', ['$http', function($http){
  var factory = {};

  factory.getUser = function(userId){
    return $http.get('/users/'+userId)
  };

  factory.createUser = function(userParams){
    return $http.post('/users', {"user": userParams})
  };

  factory.signIn = function(userInfo){
    return $http.post('/users/signIn', {"user": userInfo})
  };

  factory.logout = function(userId){
    return $http.delete('/logout/'+userId)
  };

  factory.validateUniqueness = function(type,input){
    return $http.get('/validate_sign_up_uniqueness'+'?type='+type+'&input='+input)
  }

  return factory;

}])
