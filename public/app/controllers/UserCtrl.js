sponApp.controller('UserCtrl', ['$scope', '$rootScope', 'usersFactory', '$routeParams', '$location', 'flash', 'googleMaps', function($scope, $rootScope, usersFactory, $routeParams, $location, flash, googleMaps){

  var userId = $routeParams.userId;
  var user = $scope.user;

  $scope.getUser = function(){
    if (userId == $rootScope.currentUserId){
      usersFactory.getUser(userId)
      .success( function(data){
        $scope.user = data
        $scope.loadGems(data.visited_destinations.length)
        $scope.destinationMarkers = data.visited_destinations;
      })
      .error( function(data){
        $location.path('/signin')
        flash.error = "Please login."
      })
    }
    else {
      $location.path('/home')
      flash.error = "You are not authorized to access that page."
    }
  };

  $scope.submitForm = function(form){
    var isValid = form.$valid
    if (isValid){
      if(form.$name == "signUpForm"){
        $scope.createUser($scope.user)
      }
      else if (form.$name == "loginForm"){
        $scope.signIn($scope.user)
      }
    }
  };

  $scope.createUser = function(user){
    usersFactory.createUser(user)
    .success( function(data){
      $scope.signUpForm.$setPristine();
      $scope.user = {};
      $location.path('/signin');
      flash.success = 'Succesfully signed up, please login';
    })
    .error( function(data){
      flash.error = 'There was an error with your entered info, please double check.';
    })
  };

  $scope.signIn = function(userInfo){
    usersFactory.signIn(userInfo)
    .success( function(user){
      $location.path('/profile/'+user.id)
      flash.success= "Welcome back " + user.username + "!"
      $(".name").html('<h3>'+ user.username + '</h3>')
      $rootScope.currentUserId =user.id;
    })
    .error( function(){
      flash.error = "Error logging in. Please double-check your info or reset password."
    })
  }

  $scope.loggedIn = function(){
    if ($rootScope.currentUserId !== undefined){ return true }
    else { return false }
  }

  $scope.validate = function(input){
    if ( $(input.target).hasClass("email")){
      usersFactory.validate("email",input)
    }
    else if ( $(input.target).hasClass("username")){
      usersFactory.validate("username",input)
    }
  }

  $scope.loadGems = function(adventures){
    var one_gem = "<div class='profile_gem_circle'>\
                      <img class='profile_gem' src='/img/gem_1_blue.svg'></img>\
                   </div>";
    var five_gem = "<div class='profile_gem_label_container'>\
                    <p class='gem_label'>5</p>\
                    <div class='profile_gem_circle_cream'>\
                      <img class='profile_gem' src='/img/gem_1_cream.svg'></img>\
                    </div>";
    var ten_gem =  "<div class='profile_gem_label_container'>\
                    <p> class='gem_label'10</p>\
                    <div class='profile_gem_circle'>\
                      <img class='profile_gem' src='/img/gem_1_red.svg'></img>\
                    </div>";

    // jquery multiple appends time comparison
    // http://jsperf.com/jquery-append-multiple-times-vs-array-vs-html-once
    var html = "";

    var tens = adventures/10
    var tens_r = adventures % 10
    var fives = tens_r/5
    var ones = tens_r % 5

    // javascript loop time comparisons
    // https://blogs.oracle.com/greimer/entry/best_way_to_code_a
    if (tens >= 1){ while( tens-- ){ html+= ten_gem } }
    if (fives >= 1){ while( fives-- ){ html+= five_gem } }
    if (ones >= 1){ while( ones-- ){ html+= one_gem } }
    $(".profile_gems").html(html);

    // EXAMPLES
    // User has 23 adventures:
    // var tens = 23/10 -> 2
    // var tens_r = 23 % 10 -> 3
    // var fives = tens_r/5 -> 3/5 -> 0
    // var ones = tens_r%5 -> 3
    // --> 2 tens, 3 ones

    // User has 11 adventures:
    // var tens = 11/10 -> 1
    // var tens_r = 23 % 10 -> 1
    // var fives = tens_r/5 -> 1/5 -> 0
    // var ones = tens_r%5 -> 1
    // --> 1 tens, 1 ones

    // User has 8 adventures:
    // var tens = 8/10 -> 0
    // var tens_r = 8 % 10 -> 8
    // var fives = tens_r/5 -> 8/5 -> 1
    // var ones = tens_r%5 -> 3
    // --> 1 fives, 3 ones

    // User has 3 adventures:
    // var tens = 3/10 -> 0
    // var tens_r = 3 % 10 -> 3
    // var fives = tens_r/5 -> 3/5 -> 0
    // var ones = tens_r%5 -> 3
    // --> 3 ones
  };


  $scope.map = {
    center: {
        latitude: 39.8282,
        longitude: -98.5795
    },
    zoom: 2,
    draggable: true
  };

  $scope.mapOptions = {
        styles: googleMaps.mapStyles,
        zoomControl: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false
  };

  // $scope.options=
  //   { draggable: true,
  //     labelAnchor: '10 39',
  //     labelContent: i,
  //     labelClass: 'labelMarker'},
  //     latitude: latitude,
  //     longitude: longitude,
  //     title: 'm' + i
  //   };

}]);
