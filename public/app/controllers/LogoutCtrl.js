sponApp.controller('LogoutCtrl', ['usersFactory','$location', 'flash', '$cookieStore', function($location, flash, $cookieStore, usersFactory){

  var logout = function(){
    var current_user = $cookieStore.get('current_user_id');
    usersFactory.logout(current_user)
    .success( function(){
      $location.path('/home')
      console.log($cookieStore.get('current_user_id'))
    })
    .error( function(data){
      console.log(data)
      console.log("ERROR")
    })
  };

  logout();

}]);
