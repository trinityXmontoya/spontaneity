sponApp.controller('LogoutCtrl', ['usersFactory','$location', 'flash', '$cookies', function(usersFactory, $location, flash, $cookies){

  var logout = function(){
    var user_id = $cookies.currentUserId;
    usersFactory.logout(user_id)
    .success( function(){
      console.log('no error')
      $location.path('/home')
      $cookies.currentUserId = ""
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
