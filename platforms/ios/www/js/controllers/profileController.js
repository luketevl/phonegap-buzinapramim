'use strict';
app.controller('profileController', ['$scope', '$location', '$http', '$rootScope', 'localStorageService', function ($scope, $location, $http, $rootScope, localStorageService) {
console.log($rootScope.sessionToken);

  $http({

    method: 'POST',
    url: 'https://api.parse.com/1/functions/profile',
    headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken}

    })
    .success(function(response){
      $scope.mail = response.result.email;
      $scope.nome = response.result.name;

             if ($rootScope.facebookId) {
                angular.element('.profile-image').attr('src', 'https://graph.facebook.com/' + $rootScope.facebookId + '/picture?type=large');
             }
    })
    .error(function(erro){
      console.log(erro);
    });

 $scope.logout = function(){

   $http({

     method: 'POST',
     url: 'https://api.parse.com/1/functions/logout',
     headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken}

     })
     .success(function(response){
        localStorageService.set('authorizationData', {
          token: "",
          useRefreshTokens: true
        });
              $rootScope.facebookId = null;
        localStorageService.remove('authorizationData');
              $scope.success = function(result) {
              $rootScope.facebookId = null;
              console.log('saiu com sucesso');
              }
              $scope.failure = function(erro) {
              console.log('erro');
              }

              facebookConnectPlugin.logout($scope.success, $scope.failure);
       $location.path('inicio');
     })
     .error(function(erro){
       console.log(erro);
     });
 }

}]);
