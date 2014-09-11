sponApp.controller('LogoutCtrl', ['$rootScope','usersFactory','$location', 'flash', function($rootScope, usersFactory, $location, flash){

  var logout = function(){
    var user_id = $rootScope.currentUserId;
    usersFactory.logout(user_id)
    .success( function(){
      $location.path('/home')
      $rootScope.currentUserId = undefined
      flash.success="Succesfully logged out"
    })
    .error( function(data){
      $location.path('/home')
      flash.error="You are not authorized to perform that action"
    })
  };

  logout();

}]);
