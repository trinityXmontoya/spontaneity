sponApp.controller('LogoutCtrl', ['$rootScope','usersFactory','$location', 'flash', function($rootScope, usersFactory, $location, flash){

  var logout = function(){
    var user_id = $rootScope.currentUserId;
    console.log(user_id)
    usersFactory.logout(user_id)
    .success( function(){
      console.log('no error')
      $location.path('/home')
      $rootScope.currentUserId = undefined
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
