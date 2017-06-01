var rogueone = angular.module('rogueone',['ngRoute','ngTouch']);

rogueone.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'client/templates/login.html',
        controller: 'loginctrl'
      }).when('/dash', {
       templateUrl: 'client/templates/seekdash.html',
        controller: 'seekdash'
      })
       .when('/cart', {
       templateUrl: 'client/templates/cart.html',
        controller: 'cart'
      })
        .otherwise({
        redirectTo: '/'
      });
    
       
}]);


rogueone.run(function ($rootScope, $location) {
     $rootScope.getSession = function () {
     }
    
});