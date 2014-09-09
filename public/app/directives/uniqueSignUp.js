sponApp.directive('uniqueSignUp', ["usersFactory", function(usersFactory){
  return {
    // applies to HTML element *A*ttributes only
    restrict: 'A',
    // need ngModel to handle data binding/validation from ngModelController
    require: 'ngModel',
    link: function(scope,el,attrs,ngModel){
      el.bind('blur', function (e) {
        if (!ngModel || !el.val()) return;
        var type = el[0].name;
        var input = el.val();
        usersFactory.validateUniqueness(type,input)
        .success(function(res){
          if (input == el.val()){
            res = JSON.parse(res)
            console.log(res)
            ngModel.$setValidity('unique',res);
          }
        })
        .error(function(data){
          console.log("oh boy");
        });
      });
    }
  }
}]);
