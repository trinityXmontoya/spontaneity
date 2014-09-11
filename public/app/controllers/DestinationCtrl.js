sponApp.controller('DestinationCtrl', ['$scope', '$rootScope','destinationsFactory','$routeParams', '$location', 'flash', function($scope, $rootScope, destinationsFactory, $routeParams, $location, flash){

  $scope.submitForm = function(isValid){
    if (isValid){
      $scope.submitDestination($scope.destination)
    }
  };

  $scope.submitDestination = function(destination) {
    var currentUser = $rootScope.currentUserId
    destination.user_id = currentUser
    destinationsFactory.createDestination(destination)
    .success( function(){
      $scope.destinationForm.$setPristine();
      $scope.destination = {};
      $location.path('/profile/'+ currentUser)
      flash.success = "Thanks! We've added " + destination.name + " to our list of adventures!"
    })
    .error( function(data){
      console.log(data)
       if (data.lat){
        flash.error = "Sorry! This destination already exists"
       }
       else if (data.name){
        flash.error = "You must provide a name for the destination."
       }
       else {
        flash.error = "Error submitting destination, please try again."
       }
    })
  };

  $scope.addrVerification = function(){
    $('form[name=destinationForm]').LiveAddress({
      key: "982004215141362080",
      debug: true,
      invalidMessage: "Address not valid"
    })
    $('.smarty-tag').remove();
    $('#destination_address').css('background','#F9FFE6')[0].placeholder="ADDRESS"
  };

}]);
