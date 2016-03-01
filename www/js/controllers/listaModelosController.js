'use strict';
app.controller('listaModelosController', ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http, $rootScope) {

    $scope.modelos = [];

	  $scope.goToHome = function () {
        $location.path('home');
    };

    $scope.itemSelected = function(){

      for (var i = 0; i < $scope.modelos.length; i++) {
          if ($scope.modelos[i].checked ) {
            $rootScope.modeloSelecionado = $scope.modelos[i].name;
            $rootScope.modelIdSelecionada = $scope.modelos[i].modelId;
          }
      };

      $location.path('home');
  }


  $scope.loading = true;

    $http({

  		method: 'POST',
  		url: 'https://api.parse.com/1/functions/models',
  		headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken},
      data:{
        brandId: $rootScope.brandIdSelecionada
      }

  	})
    .success(function(response){

        $scope.loading = false;
    		$scope.modelos = response.result.models;

    })
    .error(function(erro){
      console.log(erro);
      $scope.loading = false;
      $('.no-result-box').css('display', 'block');
    });

}]);
