sponApp.controller('AdventureCtrl', ['$scope','adventuresFactory', '$routeParams', function($scope, adventuresFactory, $routeParams){

  adventuresFactory.createAdventure()
  .success( function(){
    // $scope. = ;
  })
  .error( function(){
    console.log("ERROR: " + "e")
  })


}])
