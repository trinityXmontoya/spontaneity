sponApp.controller('LogoutCtrl', ['$rootScope','usersFactory','$location', 'flash', function($rootScope,usersFactory, $location, flash){

  var logout = function(){
    var user_id = $rootScope.currentUserId;
    usersFactory.logout(user_id)
    .success( function(){
      console.log('no error')
      $location.path('/home')
      $rootScope.currentUserId = ""
      flash.success="Succesfully logged out"
    })
    .error( function(data){
      console.log("ERROR")
      $location.path('/home')
      flash.error="You are not authorized to perform that action"
    })
  };

  logout();

}]);
