sponApp.controller('ProfileCtrl',['$location', '$rootScope','flash', function($location,$rootScope, flash){
  var init = function(){
    $location.path('/profile/'+$rootScope.currentUserId)
  }
  init();
}])
