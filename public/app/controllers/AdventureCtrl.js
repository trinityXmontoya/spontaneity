sponApp.controller('AdventureCtrl', ['$scope','adventuresFactory', '$routeParams', function($scope, adventuresFactory, $routeParams){

  $scope.submitAdventure = function(adventure){
    adventuresFactory.createAdventure(adventure)
    .success( function(){
      console.log("we did it!")
    })
    .error( function(){
      console.log("ERROR: " + "e")
    })
  }

}])
